import React, { useState, useEffect, useRef } from 'react';
import ToolLayout from '../components/ToolLayout';
import ResponsiveToolContainer from '../components/ResponsiveToolContainer';
import { useDarkMode } from '../context/DarkModeContext';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode';

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://example.com');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('M');
  const [size, setSize] = useState(200);
  const [darkColor, setDarkColor] = useState('#000000');
  const [lightColor, setLightColor] = useState('#ffffff');
  const [margin, setMargin] = useState(4);
  const [activeTab, setActiveTab] = useState('text');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
    website: '',
    company: '',
    title: '',
    address: '',
  });
  const [wifiInfo, setWifiInfo] = useState({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false,
  });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();
  const toolName = 'qrcodegenerator';

  useEffect(() => {
    generateQRCode();
  }, [text, errorCorrectionLevel, size, darkColor, lightColor, margin]);

  useEffect(() => {
    let content = '';
    
    if (activeTab === 'text') {
      content = text;
    } else if (activeTab === 'contact') {
      content = generateVCard();
    } else if (activeTab === 'wifi') {
      content = generateWifiString();
    }
    
    setText(content);
  }, [activeTab, contactInfo, wifiInfo]);

  const generateVCard = () => {
    const { name, phone, email, website, company, title, address } = contactInfo;
    
    if (!name) return '';
    
    let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
    if (name) vcard += `FN:${name}\nN:${name};;;\n`;
    if (phone) vcard += `TEL:${phone}\n`;
    if (email) vcard += `EMAIL:${email}\n`;
    if (website) vcard += `URL:${website}\n`;
    if (company) vcard += `ORG:${company}\n`;
    if (title) vcard += `TITLE:${title}\n`;
    if (address) vcard += `ADR:;;${address};;;\n`;
    vcard += 'END:VCARD';
    
    return vcard;
  };

  const generateWifiString = () => {
    const { ssid, password, encryption, hidden } = wifiInfo;
    
    if (!ssid) return '';
    
    let wifi = 'WIFI:';
    wifi += `S:${ssid};`;
    if (password) wifi += `P:${password};`;
    wifi += `T:${encryption};`;
    if (hidden) wifi += 'H:true;';
    wifi += ';';
    
    return wifi;
  };

  const generateQRCode = async () => {
    if (!text) return;
    
    try {
      const options = {
        errorCorrectionLevel: errorCorrectionLevel as 'L' | 'M' | 'Q' | 'H',
        width: size,
        margin: margin,
        color: {
          dark: darkColor,
          light: lightColor,
        },
      };
      
      const dataUrl = await QRCode.toDataURL(text, options);
      setQrCodeDataUrl(dataUrl);
      
      if (canvasRef.current) {
        QRCode.toCanvas(canvasRef.current, text, options);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert(t('common.error'));
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeDataUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(t('common.success'));
  };

  const copyQRCode = () => {
    if (!qrCodeDataUrl) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]).then(() => {
            alert(t('common.copied'));
          }).catch(err => {
            console.error('Error copying QR code:', err);
            alert(t('common.error'));
          });
        }
      });
    };
    
    img.src = qrCodeDataUrl;
  };

  const handleContactInfoChange = (field: string, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleWifiInfoChange = (field: string, value: string | boolean) => {
    setWifiInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ToolLayout
      toolName={toolName}
      path="qr-code-generator"
    >
      <ResponsiveToolContainer
        toolName={toolName}
        usage={t(`tools.${toolName}.usage`)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-4 rounded border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="mb-4">
              <div className="flex border-b mb-4">
                <button
                  className={`py-2 px-4 ${activeTab === 'text' ? 
                    (darkMode ? 'bg-gray-700 text-white' : 'bg-blue-100 text-blue-800') : 
                    ''}`}
                  onClick={() => setActiveTab('text')}
                >
                  {t(`tools.${toolName}.texturl`)}
                </button>
                <button
                  className={`py-2 px-4 ${activeTab === 'contact' ? 
                    (darkMode ? 'bg-gray-700 text-white' : 'bg-blue-100 text-blue-800') : 
                    ''}`}
                  onClick={() => setActiveTab('contact')}
                >
                  {t(`tools.${toolName}.contact`)}
                </button>
                <button
                  className={`py-2 px-4 ${activeTab === 'wifi' ? 
                    (darkMode ? 'bg-gray-700 text-white' : 'bg-blue-100 text-blue-800') : 
                    ''}`}
                  onClick={() => setActiveTab('wifi')}
                >
                  {t(`tools.${toolName}.wifi`)}
                </button>
              </div>
              
              {activeTab === 'text' && (
                <div className="space-y-2">
                  <label className="block font-medium mb-1">{t(`tools.${toolName}.textorurl`)}</label>
                  <textarea
                    placeholder={t(`tools.${toolName}.texturlplaceholder`)}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
                    rows={5}
                  />
                </div>
              )}
              
              {activeTab === 'contact' && (
                <div className="space-y-3">
                  <div>
                    <label className="block font-medium mb-1">{t('common.name')}*</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={contactInfo.name}
                      onChange={(e) => handleContactInfoChange('name', e.target.value)}
                      className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">{t('common.email')}</label>
                    <input
                      type="email"
                      placeholder="john.doe@example.com"
                      value={contactInfo.email}
                      onChange={(e) => handleContactInfoChange('email', e.target.value)}
                      className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">{t('common.title')}</label>
                    <input
                      type="text"
                      placeholder="Software Engineer"
                      value={contactInfo.title}
                      onChange={(e) => handleContactInfoChange('title', e.target.value)}
                      className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">{t('common.phone')}</label>
                    <input
                      type="text"
                      placeholder="+1 (555) 123-4567"
                      value={contactInfo.phone}
                      onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                      className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">{t('common.website')}</label>
                    <input
                      type="text"
                      placeholder="https://example.com"
                      value={contactInfo.website}
                      onChange={(e) => handleContactInfoChange('website', e.target.value)}
                      className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">{t('common.company')}</label>
                    <input
                      type="text"
                      placeholder="Acme Inc."
                      value={contactInfo.company}
                      onChange={(e) => handleContactInfoChange('company', e.target.value)}
                      className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">{t('common.address')}</label>
                    <input
                      type="text"
                      placeholder="123 Main St, City, Country"
                      value={contactInfo.address}
                      onChange={(e) => handleContactInfoChange('address', e.target.value)}
                      className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
                    />
                  </div>
                </div>
              )}
              
              {activeTab === 'wifi' && (
                <div className="space-y-3">
                  <div>
                    <label className="block font-medium mb-1">{t('common.network')}*</label>
                    <input
                      type="text"
                      placeholder="WiFi Network Name"
                      value={wifiInfo.ssid}
                      onChange={(e) => handleWifiInfoChange('ssid', e.target.value)}
                      className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">{t('common.password')}</label>
                    <input
                      type="password"
                      placeholder="WiFi Password"
                      value={wifiInfo.password}
                      onChange={(e) => handleWifiInfoChange('password', e.target.value)}
                      className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">{t('common.encryption')}</label>
                    <select
                      value={wifiInfo.encryption}
                      onChange={(e) => handleWifiInfoChange('encryption', e.target.value)}
                      className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">{t('common.none')}</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="wifi-hidden"
                      checked={wifiInfo.hidden}
                      onChange={(e) => handleWifiInfoChange('hidden', e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="wifi-hidden">{t('common.hidden')}</label>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-3 mt-6">
              <div>
                <label className="block font-medium mb-1">
                  {t(`tools.${toolName}.errorcorrection`)}
                </label>
                <select
                  value={errorCorrectionLevel}
                  onChange={(e) => setErrorCorrectionLevel(e.target.value)}
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
                >
                  <option value="L">{t(`tools.${toolName}.low`)}</option>
                  <option value="M">{t(`tools.${toolName}.medium`)}</option>
                  <option value="Q">{t(`tools.${toolName}.quartile`)}</option>
                  <option value="H">{t(`tools.${toolName}.high`)}</option>
                </select>
              </div>
              
              <div>
                <label className="block font-medium mb-1">{t(`tools.${toolName}.size`)}: {size}px</label>
                <input
                  type="range"
                  min="100"
                  max="500"
                  step="10"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block font-medium mb-1">{t(`tools.${toolName}.margin`)}: {margin}</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={margin}
                  onChange={(e) => setMargin(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">{t('common.color')}</label>
                  <div className="flex">
                    <input
                      type="color"
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                      className="w-10 h-10 p-1"
                    />
                    <input
                      type="text"
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                      className={`flex-1 ml-2 p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block font-medium mb-1">{t(`tools.${toolName}.backgroundcolor`)}</label>
                  <div className="flex">
                    <input
                      type="color"
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                      className="w-10 h-10 p-1"
                    />
                    <input
                      type="text"
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                      className={`flex-1 ml-2 p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="border rounded p-4 bg-white mb-4">
                {qrCodeDataUrl ? (
                  <canvas ref={canvasRef} className="mx-auto"></canvas>
                ) : (
                  <div className="w-[200px] h-[200px] flex items-center justify-center text-gray-400">
                    {t(`tools.${toolName}.content`)}
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2 mt-4">
                <button 
                  onClick={downloadQRCode} 
                  disabled={!qrCodeDataUrl}
                  className={`px-4 py-2 rounded ${darkMode ? 
                    'bg-blue-600 text-white hover:bg-blue-700' : 
                    'bg-custom-light-blue text-white hover:bg-custom-dark-blue'} 
                    ${!qrCodeDataUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {t(`common.download`)}
                </button>
                <button 
                  onClick={copyQRCode} 
                  disabled={!qrCodeDataUrl}
                  className={`px-4 py-2 rounded ${darkMode ? 
                    'bg-gray-600 text-white hover:bg-gray-700' : 
                    'bg-gray-200 text-gray-800 hover:bg-gray-300'} 
                    ${!qrCodeDataUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {t(`common.copy`)}
                </button>
              </div>
              
              {activeTab !== 'text' && (
                <div className="mt-6 w-full">
                  <label className="block font-medium mb-1">{t(`common.result`)}</label>
                  <textarea
                    value={text}
                    readOnly
                    className={`w-full p-2 border rounded font-mono text-xs ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100'}`}
                    rows={5}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </ResponsiveToolContainer>
    </ToolLayout>
  );
}
