# BionicReader

BionicReader is a Chrome extension designed to enhance your reading experience by making half of each word bold. This technique can help increase reading speed and improve comprehension.

## Features

- **Bionic Reading Mode**: Boldens the first half of each word on a webpage to guide your eyes and improve reading flow.
- **Toggle Bionic Reading**: Easily enable or disable the Bionic Reading effect on any webpage.
- **Word Colorization**: Option to randomly colorize words for a more engaging reading experience.
- **Adjustable Opacity**: Customize the transparency of non-bold text to suit your preference.

## Installation

1. **Download or Clone the Repository**:
   - Download the ZIP file and extract it, or clone the repository to your local machine.

2. **Load the Extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** by toggling the switch in the upper-right corner.
   - Click on **Load unpacked** and select the directory containing the extension files.

## Usage

- **Activate Bionic Reading**:
  - Click on the BionicReader icon in the Chrome toolbar to open the popup.
  - Click the **Toggle Bionic Reading** button to apply or remove the Bionic Reading effect on the current page.

- **Activate Word Colors**:
  - In the popup, click the **Toggle Word Colors** button to colorize or revert the words on the page.

- **Adjust Non-Bold Opacity**:
  - Right-click the BionicReader icon and select **Options**, or go to `chrome://extensions/`, find BionicReader, and click **Details** > **Extension options**.
  - Use the slider to adjust the opacity of non-bold text. The value updates in real-time and is saved automatically.

## Permissions

- **Active Tab**: Allows the extension to interact with the active tab when you click the extension icon.
- **Storage**: Enables the extension to save your settings (like non-bold text opacity) between sessions.
- **Scripting**: Allows the extension to inject scripts into web pages to modify content.

## File Structure

- **manifest.json**: Defines the extension's metadata, permissions, and scripts.
- **popup.html**: The HTML file for the extension's popup interface.
- **popup.js**: Handles user interactions from the popup.
- **options.html**: The HTML file for the extension's options page.
- **options.js**: Manages settings adjustments and saves preferences.
- **content_script.js**: Contains the logic to apply the Bionic Reading effect and word colorization to web pages.
- **styles.css**: CSS styles applied by the content script to style the modified text.
- **background.js**: Listens for events like clicking the extension icon to trigger actions.

## Notes

- The extension excludes `*.google.com` pages to comply with Chrome Web Store policies.
- The content scripts run on `<all_urls>` to allow the Bionic Reading effect on any webpage you visit.

## Contribution

Contributions are welcome! If you have suggestions or find issues, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.