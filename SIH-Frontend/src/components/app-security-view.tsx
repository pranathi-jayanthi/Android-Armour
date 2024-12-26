
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShieldCheck,
  Smartphone,
  Lock,
  RefreshCcw,
  Shield,
} from "lucide-react";
import { Button } from "./ui/button";

export default function SecurityDashboard() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Android Security Dashboard</h1>
      </header>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Overall Security Status</CardTitle>
          <CardDescription>
            Your device&apos;s current security overview
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <ShieldCheck className="h-24 w-24 text-green-500" />
          </div>
          <p className="mt-4 text-center text-lg">
            Your Android APK is currently secure and up-to-date.
          </p>
          <div className="flex items-center justify-center mt-4">
            <Button>
              <a
                href="/app-debug_sealed.apk"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download APK
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Security Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Bluetooth Security",
                icon: <Lock className="h-8 w-8" />,
                description: "Secure Bluetooth connections",
                added: true,
              },
              {
                title: "Mobile Patch Security",
                icon: <Smartphone className="h-8 w-8" />,
                description: "Latest security patches applied",
                added: true,
              },
              {
                title: "Version Security",
                icon: <RefreshCcw className="h-8 w-8" />,
                description: "OS and app versions are current",
                added: false,
              },
              {
                title: "Network Security",
                icon: <Shield className="h-8 w-8" />,
                description: "Protected network connections",
                added: true,
              },
              {
                title: "Data Encryption",
                icon: <Lock className="h-8 w-8" />,
                description: "Your data is encrypted",
                added: true,
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="flex flex-col items-center p-4 text-center"
              >
                <div
                  className={`mb-2 rounded-full p-2 
                  ${
                    feature.added
                      ? "bg-green-300 text-black"
                      : "text-primary bg-primary/10"
                  }`}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
