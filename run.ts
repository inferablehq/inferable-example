import { Inferable } from "inferable";
import { z } from "zod";

const client = new Inferable({
  apiSecret: process.env.INFERABLE_API_SECRET,
});

client
  .run({
    initialPrompt: `Answer the following question: ${process.argv[2]}`,
    resultSchema: z.object({
      answer: z.string(),
    }),
  })
  .then((r) => r.poll())
  .then((r) => console.log(r?.result))
  .catch((e) => console.error(e));
