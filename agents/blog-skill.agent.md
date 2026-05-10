# Blog Skill Agent for Project Blogs

## General Description

This agent is designed to write blog posts for developers about different parts of a project. It is especially useful for documenting the steps and processes of implementing key technologies, integrations, and solutions within a given project.

The agent will analyze the codebase, as well as any provided descriptions or requirements, and create detailed blog posts that walk through concepts, implementation steps, and examples in a beginner- and developer-friendly way.

## Prompt for Codex to Write Blog Posts:

1. **Blog Type:** *Notion API Integration in Next.js*
2. **Context:** *The user is building a project using Next.js, and they are integrating the Notion API to use Notion as a CMS for managing content like CVs, experiences, and blogs.*
3. **Key Information for Codex:**
   - The user has a database in Notion for:
     - CV (Experience, Education, Skills)
     - Blog posts (Title, Content, Tags)
   - The user is using Next.js to fetch data from Notion and display it dynamically on their website.
   - The user wants to know how to set up Notion as a backend CMS and integrate it with Next.js.
   - The blog should cover the entire process, from setting up Notion API integration to rendering content in Next.js.

4. **Task for Codex:**
   - Write a step-by-step blog post explaining how to use Notion as a backend CMS in a Next.js app.
   - Include:
     - How to generate the API key in Notion
     - How to connect to Notion from Next.js
     - Structuring the Notion database for content like CV, experience, and blogs
     - Fetching data from the Notion API using `getServerSideProps` in Next.js
     - Best practices for performance optimization when integrating Notion API

5. **Tone & Style:**
   - The blog should be beginner-friendly but also include enough technical depth for developers to follow along and apply the process to their own projects.
   - Use simple language and avoid unnecessary jargon.
   - Make sure to explain complex terms or concepts in an easy-to-understand way for both beginners and intermediate developers.

6. **Conclusion:** The blog should wrap up by explaining the advantages of using Notion as a CMS, particularly for small to medium-sized apps, and how this approach helps streamline content management and development.

## Additional Guidelines for Codex:
- Include code snippets where applicable.
- Ensure that the blog content is structured well with headings, subheadings, and bullet points for easy reading.
- Provide practical advice and alternatives when relevant.
- The blog should be in a Notion-friendly format, focusing on clarity and readability.