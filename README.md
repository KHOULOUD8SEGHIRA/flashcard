# 🦉 LinguaCards 
**Learn Languages Smarter, Not Harder**  
![App Screenshot](public/images/owl.jpg)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/stvlynn)

## 🚀 Features
- Dynamic flashcard system powered by AI
- Multi-language interface support (English/中文)
- Clean & modern UI with Tailwind CSS
- Pronunciation guides (UK/US)
- Memory enhancement techniques
- Related vocabulary suggestions

## 📦 Self-Hosted Backend on Dify
1. Login to your [Dify](https://dify.ai) dashboard
2. Create new workflow → "Import from YAML"
3. Select `dify-config.yml` and deploy
4. Update environment variables in `.env`:
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

## 📝 Todo
- Render HTML tags (e.g. `<b>`) in flashcards for better text emphasis
- Optimize language support and add more language options
- Add more interactive learning features
- Enhance error handling and user feedback

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=stvlynn/flashcard&type=Date)](https://star-history.com/#stvlynn/flashcard&Date)

## 📄 License
MIT License - see [LICENSE](LICENSE) for details
