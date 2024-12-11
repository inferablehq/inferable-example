import { Inferable } from "inferable";

// Initialize the Inferable client
const client = new Inferable({
  apiSecret: process.env.INFERABLE_API_SECRET,
});

import { z } from "zod";
import os from "os";

// Define the greeting function
client.default.register({
  name: "systemInformation",
  description: "Returns system information of the machine",
  schema: {
    input: z.object({
      type: z.enum(["cpus", "freemem", "arch"]),
    }),
  },
  func: async (input) => {
    const info = os[input.type](); // this is fully typesafe
    return info;
  },
});

client.default.start().then(() => {
  console.log("Greeting service is running...");
});
