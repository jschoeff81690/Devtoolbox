export default function About() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">About Devtoolbox</h1>
      <p>
        Devtoolbox is a collection of developer utilities built to streamline daily tasks like formatting,
        converting, decoding, and generating data. All tools are free and run entirely in your browser.
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li><strong>JSON Formatter & Validator</strong>: Format and validate JSON data for readability and correctness.</li>
        <li><strong>UUID Generator</strong>: Generate random UUIDs quickly and copy them to the clipboard.</li>
        <li><strong>Base64 Encoder / Decoder</strong>: Encode or decode Base64 strings on the fly.</li>
        <li><strong>JWT Decoder</strong>: Decode and inspect the contents of a JWT token.</li>
        <li><strong>Timestamp Converter</strong>: Convert between Unix timestamps and readable date formats.</li>
        <li><strong>Case Converter</strong>: Convert text to UPPER, lower, Title, camelCase, or snake_case.</li>
        <li><strong>Lorem Ipsum Generator</strong>: Generate placeholder paragraphs of lorem ipsum text.</li>
        <li><strong>Regex Tester</strong>: Test regular expressions against any input string.</li>
        <li><strong>Markdown to HTML Converter</strong>: Convert your Markdown text to clean, readable HTML with live preview.</li>
        <li><strong>HTML/CSS Minifier</strong>: Minify your HTML and CSS code quickly and efficiently.</li>
        <li><strong>Diff Checker</strong>: Compare text, JSON, or code to identify differences.</li>
        <li><strong>String Hashing Tool</strong>: Generate hashes like MD5, SHA256, etc., for your strings.</li>
        <li><strong>Color Picker with HEX/RGB Converter</strong>: Select colors and convert between HEX and RGB formats.</li>
        <li><strong>Bash Script Beautifier</strong>: Format and beautify your Bash scripts for better readability.</li>
        <li><strong>Gzip/Deflate Compression Tool</strong>: Compress your files using Gzip or Deflate algorithms.</li>
        <li><strong>URL Parser & Decoder</strong>: Parse and decode URLs to extract components and parameters.</li>
        <li><strong>Sitemap Extractor</strong>: Extract and analyze XML sitemaps from URLs or uploaded files.</li>
      </ul>
    </div>
  )
}
