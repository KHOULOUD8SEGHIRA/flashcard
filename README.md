# 🦉 LinguaCards 
**Learn Languages Smarter, Not Harder**  
![App Screenshot](public/images/owl.jpg)

## 🚀 Features
- Dynamic flashcard system powered by AI
- Multi-language interface support (English/中文)
- Clean & modern UI with Tailwind CSS
- Pronunciation guides (UK/US)
- Memory enhancement techniques
- Related vocabulary suggestions

## 📦 Self-Hosted Backend on Dify
1. **Prepare DSL File**:  
   ```bash
   cp dify_backend.yml dify-config.yml
   ```
2. Login to your [Dify](https://dify.ai) dashboard
3. Create new workflow → "Import from YAML"
4. Select `dify-config.yml` and deploy
5. Update environment variables in `.env`:
   ```
   VITE_DIFY_API_KEY=your_dify_api_key
   VITE_DIFY_API_URL=your_workflow_endpoint
   ```

## 🤝 How to Contribute
We welcome contributions in these areas:
- **New Language Packs** 
  - Add YAML files in `public/locales/[lang]/`
- **UI Improvements**
  - Component optimizations in `src/components/`
- **AI Prompt Engineering**
  - Enhance prompts in `dify_backend.yml`
- **Documentation**
  - Improve tutorials or translate documentation
- **Bug Reports**
  - Open issues with reproduction steps

## 🛠 Development Setup
```bash
npm install
npm run dev
```

## 📄 License
MIT License - see [LICENSE](LICENSE) for details
