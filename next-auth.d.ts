import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      sessionsId: number;
      name?: string;
      email: string;
      image?: string;
    };
  }
}
