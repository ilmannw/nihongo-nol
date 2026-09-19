import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import path from "node:path";

test("Project Authentication Routing & Middleware Verification", async (t) => {
  await t.test("middleware.ts exists and exports standard config matcher", async () => {
    const middlewarePath = path.resolve(process.cwd(), "src/middleware.ts");
    assert.equal(fs.existsSync(middlewarePath), true, "middleware.ts must exist");
    
    const middlewareContent = fs.readFileSync(middlewarePath, "utf-8");
    assert.match(middlewareContent, /clerkMiddleware/, "middleware should reference clerkMiddleware");
    assert.match(middlewareContent, /export const config/, "middleware should export config matcher");
  });

  await t.test("Sign-in and Sign-up routes exist as Next.js catch-all routes", async () => {
    const signInPath = path.resolve(process.cwd(), "src/app/sign-in/[[...sign-in]]/page.tsx");
    const signUpPath = path.resolve(process.cwd(), "src/app/sign-up/[[...sign-up]]/page.tsx");

    assert.equal(fs.existsSync(signInPath), true, "Sign-in catch-all route page must exist");
    assert.equal(fs.existsSync(signUpPath), true, "Sign-up catch-all route page must exist");

    const signInContent = fs.readFileSync(signInPath, "utf-8");
    const signUpContent = fs.readFileSync(signUpPath, "utf-8");

    assert.match(signInContent, /<SignIn\s*\/?>/, "Sign-in page must render <SignIn />");
    assert.match(signUpContent, /<SignUp\s*\/?>/, "Sign-up page must render <SignUp />");
  });

  await t.test(".env.local contains environment variable configuration for Clerk", async () => {
    const envPath = path.resolve(process.cwd(), ".env.local");
    assert.equal(fs.existsSync(envPath), true, ".env.local must exist");

    const envContent = fs.readFileSync(envPath, "utf-8");
    assert.match(envContent, /NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=/, "Publishable key env variable must be declared");
    assert.match(envContent, /CLERK_SECRET_KEY=/, "Secret key env variable must be declared");
    assert.match(envContent, /NEXT_PUBLIC_CLERK_SIGN_IN_URL=\/sign-in/, "Sign-in URL env variable must be declared");
    assert.match(envContent, /NEXT_PUBLIC_CLERK_SIGN_UP_URL=\/sign-up/, "Sign-up URL env variable must be declared");
  });
});
