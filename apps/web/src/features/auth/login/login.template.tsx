import { LoginAction } from "./components/login-action";
import { LoginImage } from "./components/login-image";

export function LoginTemplate() {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2">
      <div className="hidden bg-muted md:block">
        <LoginImage />
      </div>
      <div className="flex items-center justify-center p-8">
        <LoginAction />
      </div>
    </div>
  );
}