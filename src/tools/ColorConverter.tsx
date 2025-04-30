import React, { useState, useEffect } from 'react';
import ToolLayout from '../components/ToolLayout';
import ResponsiveToolContainer from '../components/ResponsiveToolContainer';
import { useDarkMode } from '../context/DarkModeContext';
import { useTranslation } from 'react-i18next';

// Color conversion functions
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Handle both 3-digit and 6-digit hex
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b]
    .map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');
};

const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  h /= 360;
  s /= 100;
  l /= 100;
  
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

export default function ColorConverter() {
  const { darkMode } = useDarkMode();
  const [hex, setHex] = useState('#1e90ff');
  const [rgb, setRgb] = useState({ r: 30, g: 144, b: 255 });
  const [hsl, setHsl] = useState({ h: 210, s: 100, l: 56 });
  const [error, setError] = useState('');
  const [activeColor, setActiveColor] = useState(hex);
  const { t } = useTranslation();
  const toolName = 'colorconverter';

  // Update RGB and HSL when HEX changes
  const updateFromHex = (hexValue: string) => {
    setHex(hexValue);
    const rgbValue = hexToRgb(hexValue);
    
    if (rgbValue) {
      setRgb(rgbValue);
      setHsl(rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b));
      setActiveColor(hexValue);
      setError('');
    } else {
      setError('Invalid HEX color');
    }
  };

  // Update HEX and HSL when RGB changes
  const updateFromRgb = (r: number, g: number, b: number) => {
    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
      setRgb({ r, g, b });
      const hexValue = rgbToHex(r, g, b);
      setHex(hexValue);
      setHsl(rgbToHsl(r, g, b));
      setActiveColor(hexValue);
      setError('');
    } else {
      setError('RGB values must be between 0 and 255');
    }
  };

  // Update HEX and RGB when HSL changes
  const updateFromHsl = (h: number, s: number, l: number) => {
    if (h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100) {
      setHsl({ h, s, l });
      const rgbValue = hslToRgb(h, s, l);
      setRgb(rgbValue);
      const hexValue = rgbToHex(rgbValue.r, rgbValue.g, rgbValue.b);
      setHex(hexValue);
      setActiveColor(hexValue);
      setError('');
    } else {
      setError('Invalid HSL values');
    }
  };

  // Handle HEX input change
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHex(value);
    
    // Only update other values if it's a valid hex color
    if (/^#?([a-f\d]{3}|[a-f\d]{6})$/i.test(value)) {
      const formattedHex = value.startsWith('#') ? value : `#${value}`;
      updateFromHex(formattedHex);
    }
  };

  // Handle RGB input changes
  const handleRgbChange = (component: 'r' | 'g' | 'b', value: string) => {
    const numValue = parseInt(value, 10);
    
    if (!isNaN(numValue)) {
      const newRgb = { ...rgb, [component]: numValue };
      updateFromRgb(newRgb.r, newRgb.g, newRgb.b);
    }
  };

  // Handle HSL input changes
  const handleHslChange = (component: 'h' | 's' | 'l', value: string) => {
    const numValue = parseInt(value, 10);
    
    if (!isNaN(numValue)) {
      const newHsl = { ...hsl, [component]: numValue };
      updateFromHsl(newHsl.h, newHsl.s, newHsl.l);
    }
  };

  // Copy color value to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        // Success message could be shown here
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  return (
    <ToolLayout
      toolName={toolName}
      path="color-converter"
    >
      <ResponsiveToolContainer
        toolName={toolName}
        usage={t(`tools.${toolName}.usage`)}
      >
        {/* Color Preview */}
        <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
          <div 
            className="w-24 h-24 rounded-lg border shadow-sm" 
            style={{ backgroundColor: activeColor }}
            aria-label="Color preview"
          ></div>
          
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-2">{t(`tools.${toolName}.current`)}</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => copyToClipboard(hex)}
                className={`px-3 py-1 rounded text-sm ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
                title="Copy HEX value"
              >
                {hex}
              </button>
              <button 
                onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                className={`px-3 py-1 rounded text-sm ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
                title="Copy RGB value"
              >
                rgb({rgb.r}, {rgb.g}, {rgb.b})
              </button>
              <button 
                onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                className={`px-3 py-1 rounded text-sm ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
                title="Copy HSL value"
              >
                hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
              </button>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-300 text-red-800 rounded text-sm">
            {error}
          </div>
        )}

        {/* Conversion Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* HEX Input */}
          <div>
            <label className="block mb-2 text-sm font-medium">{t(`tools.${toolName}.hex`)}</label>
            <div className="flex">
              <input
                type="text"
                value={hex}
                onChange={handleHexChange}
                className={`w-full p-2 border rounded ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                placeholder="#000000"
              />
              <input 
                type="color" 
                value={hex}
                onChange={(e) => updateFromHex(e.target.value)}
                className="ml-2 h-10 w-10 cursor-pointer"
              />
            </div>
          </div>

          {/* RGB Input */}
          <div>
            <label className="block mb-2 text-sm font-medium">{t(`tools.${toolName}.rgb`)}</label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                min="0"
                max="255"
                value={rgb.r}
                onChange={(e) => handleRgbChange('r', e.target.value)}
                className={`w-full p-2 border rounded ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                placeholder="R"
              />
              <input
                type="number"
                min="0"
                max="255"
                value={rgb.g}
                onChange={(e) => handleRgbChange('g', e.target.value)}
                className={`w-full p-2 border rounded ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                placeholder="G"
              />
              <input
                type="number"
                min="0"
                max="255"
                value={rgb.b}
                onChange={(e) => handleRgbChange('b', e.target.value)}
                className={`w-full p-2 border rounded ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                placeholder="B"
              />
            </div>
          </div>

          {/* HSL Input */}
          <div>
            <label className="block mb-2 text-sm font-medium">{t(`tools.${toolName}.hsl`)}</label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                min="0"
                max="360"
                value={hsl.h}
                onChange={(e) => handleHslChange('h', e.target.value)}
                className={`w-full p-2 border rounded ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                placeholder="H"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={hsl.s}
                onChange={(e) => handleHslChange('s', e.target.value)}
                className={`w-full p-2 border rounded ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                placeholder="S"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={hsl.l}
                onChange={(e) => handleHslChange('l', e.target.value)}
                className={`w-full p-2 border rounded ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                placeholder="L"
              />
            </div>
          </div>
        </div>
      </ResponsiveToolContainer>
    </ToolLayout>
  );
}
