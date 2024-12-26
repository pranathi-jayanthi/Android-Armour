import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { Progress } from "./enums";

export type Account = {
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
    createdAt: Generated<Timestamp>;
};
export type androidZip = {
    id: Generated<string>;
    filename: string;
    originalUrl: string;
    progress: Progress;
    error: string | null;
    updatedUrl: string | null;
    userId: string;
};
export type securityFeature = {
    id: Generated<string>;
    featureName: string;
    isAdded: boolean;
    androidZipId: string;
};
export type Session = {
    sessionToken: string;
    userId: string;
    expires: Timestamp;
    createdAt: Generated<Timestamp>;
};
export type User = {
    id: Generated<string>;
    name: string | null;
    email: string;
    emailVerified: Timestamp | null;
    image: string | null;
    createdAt: Generated<Timestamp>;
};
export type VerificationToken = {
    identifier: string;
    token: string;
    expires: Timestamp;
};
export type DB = {
    Account: Account;
    androidZip: androidZip;
    securityFeature: securityFeature;
    Session: Session;
    User: User;
    VerificationToken: VerificationToken;
};
