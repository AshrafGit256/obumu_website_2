# Obumu: ASP.NET Core Razor Pages

This is the Obumu landing page converted from a static HTML file into an
ASP.NET Core 8 Razor Pages project.

## Project structure

```
ObumuWeb/
├── Pages/
│   ├── Index.cshtml          # Full landing page markup (Layout = null)
│   ├── Index.cshtml.cs       # Page model for Index
│   ├── Error.cshtml / .cs    # Default error page
│   ├── Shared/_Layout.cshtml # Minimal layout, used only by Error.cshtml
│   ├── _ViewImports.cshtml
│   └── _ViewStart.cshtml
├── wwwroot/
│   ├── css/site.css          # All page styles, extracted from the original <style> block
│   └── js/site.js            # All page behaviour, extracted from the original <script> block
├── Program.cs                 # Minimal hosting setup (Razor Pages + static files)
└── ObumuWeb.csproj
```

## Run it

Requires the [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0).

```bash
cd ObumuWeb
dotnet run
```

Then open the URL printed in the console (e.g. http://localhost:5000).

## Notes

- The page is a single self-contained Razor Page (`Pages/Index.cshtml`) with
  `Layout = null`, since the original design has its own nav/footer rather
  than using a shared site layout.
- All CSS and JavaScript were moved out of inline `<style>`/`<script>` tags
  into `wwwroot/css/site.css` and `wwwroot/js/site.js`, served as static files.
- Google Fonts (Instrument Serif, DM Sans) and Unsplash images are still
  loaded from their original external URLs.
- No NuGet packages are required, it only depends on the ASP.NET Core
  shared framework.
