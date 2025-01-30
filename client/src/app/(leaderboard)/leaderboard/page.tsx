import React from "react";
import { z } from "zod";
import { fetchConfig } from "./utils";
import ServerUrlForm from "./server-url-form";
import { URLEncryptor } from "@/lib/urlObfuscator";

const urlObfuscatorSecret = process.env.ENCRYPTION_SECRET ?? "";
if (!urlObfuscatorSecret) {
  throw new Error("No encryption secret provided");
}

const serverUrlSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

async function processServerUrl(formData: FormData) {
  "use server";

  const url = formData.get("url");

  try {
    // Validate the URL
    const { url: validatedUrl } = serverUrlSchema.parse({ url });

    // try to get config from the server, returns error if it fails
    const config = await fetchConfig(validatedUrl + "/config");
    if (config instanceof Error) {
      return { success: false, message: config.message, data: null };
    }

    const obfuscatedUrl = new URLEncryptor(
      process.env.ENCRYPTION_SECRET ?? ""
    ).encrypt(validatedUrl);

    return { success: true, message: `Valid URL`, data: obfuscatedUrl };
  } catch (error) {
    console.log({error})
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message, data: null };
    }
    return {
      success: false,
      message: (error as Error)?.message ?? "An error occurred while processing the URL.",
      data: null,
    };
  }
}

const Page = async () => {
  return (
    <main className="flex pt-[20vh] flex-col items-center justify-center p-24">
      <div className="w-full max-w-md">
        <h1 className="text-white text-2xl font-bold mb-6">Server URL Input</h1>
        <ServerUrlForm processServerUrl={processServerUrl} />
      </div>
    </main>
  );
};

export default Page;
