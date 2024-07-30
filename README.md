# 📄✨ Document Parser Application
NextJs app using OpenAI to evaluate txt documents and generate a JSON response on details and the structure of the supplied document. Using Ant.Design and Tailwind for quick frontend development. Implemented server side validation and error handling using the new Router in Next 14. The OpenAI model used if `gpt-4o-mini` to allow for larger inputs and files. That model also has better support for the tools and functions that allow for consistent JSON responses every time. Like anything using untrained AI models, results are sometimes inconsistent.

View it live [here](https://document.raygun-playground.com/) ✨🪄✨

Tested on all modern W3 browsers. Looks the best on Chrome 🧐
![]([http://url/to/img.png](https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.m.wikipedia.org%2Fwiki%2FFile%3AGoogle_Chrome_icon_%2528February_2022%2529.svg&psig=AOvVaw1GEmWvdC893adI-8PnTh5A&ust=1722446111977000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDao_ihz4cDFQAAAAAdAAAAABAE))


## Getting Started Locally
Install the dependencies:
```bash
npm install
```

Create a .env.local file with the following:
```bash
OPENAI_API_KEY=REPLACE_WITH_YOUR_KEY
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## If I had a few more hours I'd like to...
- Specs! Broke a cardinal rule of mine by not having any E2E or integration specs for the api router.
- I'd like to fine tune the ChatCompletion prompt and the function call `extract_document_info`. This is a little too fundamental and inconsistent but works well enough for a beta release. I think it would be better if the prompt had more context but I wanted you to be able to throw any document at this and have it return something helpful. I didn't develop this by just testing it with the given txt file, hopefully not to my discredit.
- Create a fine-tuned model with training data with OpenAI
