"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Puzzle, 
  Settings, 
  Chrome, 
  Download, 
  Code2, 
  Eye, 
  Wallet, 
  Home,
  Clock,
  ArrowLeft, 
  Plus, 
  X, 
  Search, 
  LayoutGrid, 
  ArrowRightLeft, 
  Zap,
  Pencil,
  RotateCcw,
  FileText,
  Smartphone,
  ChevronDown,
  ArrowDownToLine,
  File,
  Copy,
  Send,
  Repeat,
  DollarSign,
  SlidersHorizontal,
  Maximize2,
  QrCode
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// --- Mock Data Constants ---
const DEFAULTS = {
  chain: "Solana",
  name: "1111",
  addr: "7fXB…Hin7",
  homeName: "111",
  bal: "1.22",
  delta: "-0.0274",
  pct: "-2.21",
  banner: "Meet Phantom Terminal, your new home for desktop trading",
  tokName: "Solana",
  tokAmt: "0.01 SOL",
  tokUsd: "1.22",
  tokChg: "-0.03",
  manage: "Manage token list",
  badgeCount: "3"
};

// --- Original Files Content ---
const FILES = {
  manifest: `{
  "manifest_version": 3,
  "name": "Phantom Wallet Mockup Editor",
  "version": "1.0",
  "description": "A mockup editor for Phantom Wallet UI, allowing visual customization of balances and data.",
  "action": {
    "default_popup": "popup.html"
  },
  "permissions": ["storage"]
}`,
  popupHtml: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        :root {
            --bg-color: #0F0F0F;
            --card-bg: #1C1C1E;
            --accent: #AB9FF2;
            --text-zinc-500: #71717A;
            --text-zinc-400: #A1A1AA;
        }
        * { box-sizing: border-box; }
        body {
            background-color: var(--bg-color);
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            width: 375px;
            height: 600px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .screen {
            position: absolute;
            inset: 0;
            display: none;
            flex-direction: column;
            background: var(--bg-color);
            z-index: 10;
        }
        .screen.active { display: flex; }
        
        /* Header */
        header {
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            shrink: 0;
        }
        .header-title { font-weight: bold; font-size: 18px; }

        /* S1: Add Account */
        .list-container {
            flex: 1;
            overflow-y: auto;
            padding: 8px 16px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .list-item {
            background: var(--card-bg);
            border-radius: 22px;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            gap: 16px;
            border: 1px solid rgba(255,255,255,0.05);
            cursor: pointer;
            text-align: left;
            width: 100%;
            color: white;
            border: none;
        }
        .item-icon {
            width: 44px;
            height: 44px;
            background: #2C2C2E;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .item-text h4 { margin: 0; font-size: 17px; font-weight: bold; }
        .item-text p { margin: 2px 0 0; font-size: 14px; color: var(--text-zinc-400); }

        /* S3: Home */
        .home-header { padding: 16px; display: flex; justify-content: space-between; align-items: center; }
        .account-badge {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
        }
        .badge-circle {
            width: 32px;
            height: 32px;
            background: #2A2A2A;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
        }
        .bal-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px 0 32px;
        }
        .total-bal { font-size: 46px; font-weight: bold; letter-spacing: -1px; }
        .chg-row { display: flex; align-items: center; gap: 8px; font-size: 19px; font-weight: bold; }
        .pct-badge {
            padding: 2px 6px;
            border-radius: 8px;
            font-size: 15px;
            background: rgba(255, 77, 77, 0.1);
            color: #FF4D4D;
        }
        .pct-badge.up { background: rgba(0, 255, 163, 0.1); color: #00FFA3; }

        .actions-grid {
            display: grid;
            grid-cols: 4;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            padding: 0 16px;
            margin-bottom: 32px;
        }
        .action-btn {
            aspect-ratio: 1;
            background: #2A2A2A;
            border-radius: 18px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 12px;
            font-weight: bold;
            color: var(--text-zinc-400);
        }

        .token-row {
            margin: 0 16px;
            background: #2A2A2A;
            border-radius: 20px;
            padding: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .token-info { display: flex; align-items: center; gap: 12px; }
        .token-icon { width: 44px; height: 44px; border-radius: 50%; background: black; }
        .token-vals { text-align: right; display: flex; flex-direction: column; }
        
        /* Nav */
        nav {
            height: 64px;
            border-top: 1px solid rgba(255,255,255,0.05);
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-top: auto;
            background: #1F1F1F;
        }

        /* Editor Screen */
        .editor-content {
            flex: 1;
            overflow-y: auto;
            padding: 0 24px 24px;
        }
        .field-group { margin-bottom: 16px; }
        .field-group label {
            display: block;
            font-size: 10px;
            font-weight: bold;
            color: var(--text-zinc-500);
            text-transform: uppercase;
            margin-bottom: 6px;
        }
        .field-group input {
            width: 100%;
            background: black;
            border: 1px solid #333;
            border-radius: 12px;
            padding: 12px;
            color: white;
            font-family: monospace;
        }
        .save-btn {
            width: 100%;
            height: 48px;
            background: var(--accent);
            color: black;
            border: none;
            border-radius: 12px;
            font-weight: bold;
            margin-top: 8px;
            cursor: pointer;
        }

        .hidden { display: none !important; }
    </style>
</head>
<body>
    <!-- Screen 1: Add Account -->
    <div id="s1" class="screen">
        <header>
            <button onclick="showScreen('s3')" style="background:none;border:none;color:white;cursor:pointer"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
            <span class="header-title">Add Account</span>
            <div style="width:24px"></div>
        </header>
        <div class="list-container">
            <div class="list-item" onclick="openEditor()">
                <div class="item-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
                <div class="item-text">
                    <h4>Import Recovery Phrase</h4>
                    <p>Import accounts from another wallet</p>
                </div>
            </div>
            <div class="list-item">
                <div class="item-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></div>
                <div class="item-text">
                    <h4>Create New Account</h4>
                    <p>Add a new multi-chain account</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Screen 3: Home -->
    <div id="s3" class="screen active">
        <div class="home-header">
            <div class="account-badge" onclick="showScreen('s1')">
                <div class="badge-circle" id="disp-badgeCount">3</div>
                <span style="font-weight:bold;font-size:17px" id="disp-homeName">111</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717A" stroke-width="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
            </div>
            <div style="display:flex;gap:16px;color:#71717A">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            </div>
        </div>

        <div class="bal-section">
            <div class="total-bal">$<span id="disp-bal">1.22</span></div>
            <div class="chg-row">
                <span id="disp-delta-color" style="color:#FF4D4D"><span id="disp-delta-sign">-$</span><span id="disp-delta">0.0274</span></span>
                <div id="disp-pct-badge" class="pct-badge"><span id="disp-pct-sign">-</span><span id="disp-pct">2.21</span>%</div>
            </div>
        </div>

        <div class="actions-grid">
            <div class="action-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#AB9FF2" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="12" cy="12" r="3"/></svg>Receive</div>
            <div class="action-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#AB9FF2" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polyline points="22 2 15 22 11 13 2 9 22 2"/></svg>Send</div>
            <div class="action-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#AB9FF2" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>Swap</div>
            <div class="action-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#AB9FF2" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>Buy</div>
        </div>

        <div class="token-row">
            <div class="token-info">
                <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/api.phantom-1766562867239.avif" class="token-icon">
                <div style="display:flex;flex-direction:column">
                    <span style="font-weight:bold;font-size:17px" id="disp-tokName">Solana</span>
                    <span style="font-size:13.5px;color:#71717A" id="disp-tokAmt">0.01 SOL</span>
                </div>
            </div>
            <div class="token-vals">
                <span style="font-weight:bold;font-size:17px">$<span id="disp-tokUsd">1.22</span></span>
                <span style="font-size:13.5px;color:#FF4D4D" id="disp-tokChg-color"><span id="disp-tokChg-sign">-$</span><span id="disp-tokChg">0.03</span></span>
            </div>
        </div>

        <nav>
            <div style="color:#AB9FF2"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></div>
            <div style="color:#71717A"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div>
            <div style="color:#71717A"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg></div>
            <div style="color:#71717A"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
        </nav>
    </div>

    <!-- Editor Screen -->
    <div id="s-editor" class="screen">
        <header>
            <button onclick="closeEditor()" style="background:none;border:none;color:white;cursor:pointer"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>
            <span class="header-title">Edit Mock Data</span>
            <div style="width:24px"></div>
        </header>
        
        <div class="editor-content">
            <div class="field-group">
                <label>Total Balance</label>
                <input type="text" id="edit-bal" value="1.22">
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <div class="field-group">
                    <label>Change $</label>
                    <input type="text" id="edit-delta" value="-0.0274">
                </div>
                <div class="field-group">
                    <label>Change %</label>
                    <input type="text" id="edit-pct" value="-2.21">
                </div>
            </div>
            <div class="field-group">
                <label>Token Amount (e.g. 0.01 SOL)</label>
                <input type="text" id="edit-tokAmt" value="0.01 SOL">
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <div class="field-group">
                    <label>Token USD</label>
                    <input type="text" id="edit-tokUsd" value="1.22">
                </div>
                <div class="field-group">
                    <label>Token Chg</label>
                    <input type="text" id="edit-tokChg" value="-0.03">
                </div>
            </div>
            <div class="field-group">
                <label>Account Name</label>
                <input type="text" id="edit-homeName" value="111">
            </div>

            <button class="save-btn" onclick="saveData()">Save Changes</button>
        </div>
    </div>

    <script src="popup.js"></script>
</body>
</html>`,
  popupJs: `const DEFAULTS = {
    homeName: "111",
    bal: "1.22",
    delta: "-0.0274",
    pct: "-2.21",
    tokAmt: "0.01 SOL",
    tokUsd: "1.22",
    tokChg: "-0.03",
    badgeCount: "3"
};

let currentData = { ...DEFAULTS };

function updateUI() {
    const data = currentData;
    
    // Display updates
    document.getElementById('disp-homeName').textContent = data.homeName;
    document.getElementById('disp-bal').textContent = data.bal;
    
    // Delta
    const deltaVal = data.delta.replace('-', '').replace('+', '');
    const isNegDelta = data.delta.startsWith('-');
    document.getElementById('disp-delta').textContent = deltaVal;
    document.getElementById('disp-delta-sign').textContent = isNegDelta ? "-$" : "+$";
    document.getElementById('disp-delta-color').style.color = isNegDelta ? "#FF4D4D" : "#00FFA3";
    
    // Pct
    const pctVal = data.pct.replace('-', '').replace('+', '');
    const isNegPct = data.pct.startsWith('-');
    document.getElementById('disp-pct').textContent = pctVal;
    document.getElementById('disp-pct-sign').textContent = isNegPct ? "-" : "+";
    document.getElementById('disp-pct-badge').className = "pct-badge " + (isNegPct ? "" : "up");
    
    // Token
    document.getElementById('disp-tokAmt').textContent = data.tokAmt;
    document.getElementById('disp-tokUsd').textContent = data.tokUsd;
    
    const chgVal = data.tokChg.replace('-', '').replace('+', '');
    const isNegChg = data.tokChg.startsWith('-');
    document.getElementById('disp-tokChg').textContent = chgVal;
    document.getElementById('disp-tokChg-sign').textContent = isNegChg ? "-$" : "+$";
    document.getElementById('disp-tokChg-color').style.color = isNegChg ? "#FF4D4D" : "#00FFA3";
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function openEditor() {
    document.getElementById('edit-bal').value = currentData.bal;
    document.getElementById('edit-delta').value = currentData.delta;
    document.getElementById('edit-pct').value = currentData.pct;
    document.getElementById('edit-tokAmt').value = currentData.tokAmt;
    document.getElementById('edit-tokUsd').value = currentData.tokUsd;
    document.getElementById('edit-tokChg').value = currentData.tokChg;
    document.getElementById('edit-homeName').value = currentData.homeName;
    showScreen('s-editor');
}

function closeEditor() {
    showScreen('s1');
}

function saveData() {
    currentData = {
        ...currentData,
        bal: document.getElementById('edit-bal').value,
        delta: document.getElementById('edit-delta').value,
        pct: document.getElementById('edit-pct').value,
        tokAmt: document.getElementById('edit-tokAmt').value,
        tokUsd: document.getElementById('edit-tokUsd').value,
        tokChg: document.getElementById('edit-tokChg').value,
        homeName: document.getElementById('edit-homeName').value,
    };
    
    updateUI();
    showScreen('s3');
    
    if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ mockData: currentData });
    } else {
        localStorage.setItem('phantom_mock_data', JSON.stringify(currentData));
    }
}

// Init
window.onload = () => {
    const saved = localStorage.getItem('phantom_mock_data');
    if (saved) {
        currentData = JSON.parse(saved);
        updateUI();
    } else if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.get(['mockData'], (res) => {
            if (res.mockData) {
                currentData = res.mockData;
                updateUI();
            }
        });
    }
    updateUI();
};`
};

export default function ShowcasePage() {
  const [data, setData] = useState(DEFAULTS);
  const [screen, setScreen] = useState("s3"); // Default to Home
  const [view, setView] = useState("preview"); // preview | instructions | code
  const [privateKey, setPrivateKey] = useState("");

  // Update logic
  const handleSave = () => {
    setScreen("s3");
    toast.success("Data updated successfully!");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Puzzle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">Phantom Mockup</h1>
              <p className="text-xs text-zinc-500 font-medium">Browser Extension Showcase</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={view} onValueChange={setView} className="w-auto">
              <TabsList className="bg-zinc-800/50 border border-zinc-700">
                <TabsTrigger value="preview" className="data-[state=active]:bg-zinc-700">
                  <Eye className="w-4 h-4 mr-2" /> Live Preview
                </TabsTrigger>
                <TabsTrigger value="instructions" className="data-[state=active]:bg-zinc-700">
                  <Settings className="w-4 h-4 mr-2" /> Installation
                </TabsTrigger>
                <TabsTrigger value="code" className="data-[state=active]:bg-zinc-700">
                  <Code2 className="w-4 h-4 mr-2" /> Source Code
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {view === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col lg:flex-row gap-12 items-start justify-center"
            >
              {/* Phone Mockup / Extension UI */}
              <div className="relative w-[375px] h-[667px] bg-[#0a0a0a] rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden shrink-0">
                {/* Screen Content */}
                <div className="w-full h-full bg-[#1F1F1F] flex flex-col relative overflow-hidden">
                  
                      {/* Screen 1: Add Account */}
                      <AnimatePresence>
                        {screen === "s1" && (
                          <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute inset-0 bg-[#0F0F0F] z-20 flex flex-col"
                          >
                                  <header className="h-14 flex items-center justify-between px-4">
                                  <button onClick={() => setScreen("s3")} className="p-2 text-zinc-100 hover:opacity-70 transition-opacity">
                                    <X className="w-6 h-6" />
                                  </button>
                                  <div className="font-bold text-[18.5px] text-white tracking-tight">Add Account</div>
                                  <div className="w-10" />
                                </header>
                              
                              <div className="flex-1 overflow-y-auto py-2 px-4 space-y-2.5">
                                  {[
                                  { 
                                    title: "Create New Account", 
                                    sub: "Add a new multi-chain account", 
                                    icon: <Plus className="w-5 h-5 text-white" strokeWidth={2} /> 
                                  },
                                  { 
                                    title: "Connect Hardware Wallet", 
                                    sub: "Use your Ledger hardware wallet", 
                                    icon: (
                                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="9" y="3" width="7" height="18" rx="1.5" />
                                        <path d="M9 3v18L5 17V7l4-4z" />
                                        <circle cx="12.5" cy="8" r="0.8" fill="currentColor" />
                                      </svg>
                                    )
                                  },
                                  { 
                                    title: "Import Recovery Phrase", 
                                    sub: "Import accounts from another wallet", 
                                    icon: <File className="w-5 h-5 text-white" strokeWidth={2} />,
                                    onClick: () => setScreen("editor")
                                  },
                                  { 
                                    title: "Import Private Key", 
                                    sub: "Import a single-chain account", 
                                    icon: <ArrowDownToLine className="w-5 h-5 text-white" strokeWidth={2} />, 
                                    onClick: () => setScreen("s2") 
                                  },
                                  { 
                                    title: "Watch Address", 
                                    sub: "Track any public wallet address", 
                                    icon: <Eye className="w-5 h-5 text-white" strokeWidth={2} />
                                  },
                                ].map((item, i) => (
                                  <button 
                                    key={i}
                                    onClick={item.onClick}
                                    className="w-full bg-[#1C1C1E] py-[16px] px-5 rounded-[22px] flex items-center gap-4 text-left border border-white/5 hover:bg-[#252528] active:scale-[0.98] transition-all group"
                                  >
                                    <div className="w-11 h-11 rounded-full bg-[#2C2C2E] flex items-center justify-center shrink-0 group-hover:bg-[#3A3A3C] transition-colors">
                                      {item.icon}
                                    </div>
                                    <div className="flex flex-col">
                                      <p className="font-bold text-[17px] text-white leading-tight tracking-tight">{item.title}</p>
                                      <p className="text-[14px] text-[#98989E] font-medium leading-tight tracking-tight mt-0.5">{item.sub}</p>
                                    </div>
                                  </button>
                                ))}
                              </div>
    
                              <div className="p-4 pb-8 border-t border-white/[0.03]">
                                <Button 
                                  onClick={() => setScreen("s3")} 
                                  className="w-full h-[52px] rounded-[22px] bg-[#1C1C1E] hover:bg-[#252528] text-white font-bold text-[17px] border border-white/5 active:scale-[0.98] transition-all tracking-tight"
                                >
                                  Close
                                </Button>
                              </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                  {/* Screen 2: Import */}
                  <AnimatePresence>
                    {screen === "s2" && (
                      <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="absolute inset-0 bg-[#0F0F0F] z-30 flex flex-col font-sans"
                      >
                        <header className="h-14 flex items-center justify-between px-4">
                          <button onClick={() => setScreen("s1")} className="p-2 text-zinc-100 hover:opacity-70">
                            <ArrowLeft className="w-6 h-6" />
                          </button>
                          <div className="font-bold text-[17px] text-white tracking-normal">Import Private Key</div>
                          <div className="w-10" />
                        </header>
                        
                        <div className="flex-1 overflow-y-auto px-4 pb-6">
                          <div className="flex justify-center mb-8 mt-4">
                            <div className="relative">
                              <div className="w-[88px] h-[88px] bg-[#222222] rounded-full flex items-center justify-center text-4xl font-bold text-white border border-white/5">P</div>
                              <div className="absolute bottom-0 right-0 w-[26px] h-[26px] bg-[#252525] rounded-full flex items-center justify-center border-2 border-[#0F0F0F]">
                                <Pencil className="w-3 h-3 text-zinc-400" />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2.5">
                            <div className="bg-[#1C1C1E] h-12 rounded-[12px] px-4 flex items-center justify-between border border-white/5">
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                                  <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Solana-Crypto-Logo-Transparent-resized-1766648508536.webp" className="w-4.5 h-4.5" alt="chain" />
                                </div>
                                <span className="font-bold text-[15px] text-white tracking-normal">{data.chain}</span>
                              </div>
                              <ChevronDown className="w-4 h-4 text-zinc-500" />
                            </div>

                            <div className="bg-[#1C1C1E] h-12 rounded-[12px] px-4 flex items-center border border-white/5">
                              <input 
                                type="text" 
                                placeholder="Name" 
                                className="bg-transparent border-none outline-none w-full font-bold text-[15px] text-white tracking-normal placeholder:text-zinc-600"
                                value={data.name}
                                onChange={(e) => setData({...data, name: e.target.value})}
                              />
                            </div>

                            <div className="bg-[#1C1C1E] p-4 rounded-[12px] border border-white/5">
                              <textarea 
                                placeholder="Private key" 
                                className="bg-transparent border-none outline-none w-full font-bold text-[15px] h-[112px] resize-none text-white tracking-normal leading-snug placeholder:text-zinc-600"
                                style={{ WebkitTextSecurity: 'disc' } as any}
                                value={privateKey}
                                onChange={(e) => setPrivateKey(e.target.value)}
                              />
                            </div>

                            <AnimatePresence>
                              {privateKey.length > 0 && (
                                <motion.div 
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="flex justify-between items-center px-1 pt-1"
                                >
                                  <span className="text-[14px] font-bold text-white tracking-normal">Account Address</span>
                                  <span className="text-[14px] font-bold text-zinc-500 tracking-normal">{data.addr}</span>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="p-4 pb-8">
                          <Button 
                            disabled={!privateKey}
                            onClick={() => setScreen("s3")}
                            className="w-full h-12 rounded-[12px] bg-[#AB9FF2] hover:bg-[#998EE0] text-black font-bold text-[16px] border-none disabled:opacity-50 transition-all tracking-normal"
                          >
                            Import
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Screen: Editor */}
                  <AnimatePresence>
                    {screen === "editor" && (
                      <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="absolute inset-0 bg-[#0F0F0F] z-40 flex flex-col font-sans"
                      >
                        <header className="h-14 flex items-center justify-between px-4">
                          <button onClick={() => setScreen("s1")} className="p-2 text-zinc-100 hover:opacity-70">
                            <ArrowLeft className="w-6 h-6" />
                          </button>
                          <div className="font-bold text-[17px] text-white tracking-normal">Edit Mock Data</div>
                          <div className="w-10" />
                        </header>
                        
                        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Account Address</label>
                            <input
                              type="text"
                              value={data.addr}
                              onChange={(e) => setData({ ...data, addr: e.target.value })}
                              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Total Balance</label>
                            <input
                              type="text"
                              value={data.bal}
                              onChange={(e) => setData({ ...data, bal: e.target.value })}
                              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Change $</label>
                              <input
                                type="text"
                                value={data.delta}
                                onChange={(e) => setData({ ...data, delta: e.target.value })}
                                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Change %</label>
                              <input
                                type="text"
                                value={data.pct}
                                onChange={(e) => setData({ ...data, pct: e.target.value })}
                                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Token Amount</label>
                            <input
                              type="text"
                              value={data.tokAmt}
                              onChange={(e) => setData({ ...data, tokAmt: e.target.value })}
                              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Token USD</label>
                              <input
                                type="text"
                                value={data.tokUsd}
                                onChange={(e) => setData({ ...data, tokUsd: e.target.value })}
                                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Token Chg</label>
                              <input
                                type="text"
                                value={data.tokChg}
                                onChange={(e) => setData({ ...data, tokChg: e.target.value })}
                                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Account Name</label>
                            <input
                              type="text"
                              value={data.homeName}
                              onChange={(e) => setData({ ...data, homeName: e.target.value })}
                              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                          </div>
                        </div>

                        <div className="p-4 pb-8">
                          <Button 
                            onClick={handleSave}
                            className="w-full h-12 rounded-xl bg-[#AB9FF2] hover:bg-[#998EE0] text-black font-bold text-[16px] border-none transition-all tracking-normal"
                          >
                            Save Changes
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Screen 3: Home */}
                  <AnimatePresence>
                    {screen === "s3" && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex-1 flex flex-col p-4"
                      >
                        <motion.header 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.5 }}
                          className="h-12 flex items-center justify-between mb-4"
                        >
                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setScreen("s1")}>
                              <div className="w-8 h-8 bg-[#2A2A2A] rounded-full flex items-center justify-center font-bold text-sm tracking-normal" style={{ fontFamily: 'Arial, sans-serif' }}>{data.badgeCount}</div>
                              <span className="font-bold text-[17px] tracking-normal">{data.homeName}</span>
                              <Copy className="w-4 h-4 text-zinc-500" />
                            </div>
                          <div className="flex items-center gap-4 text-zinc-500">
                            <Search className="w-6 h-6" />
                            <Maximize2 className="w-6 h-6" />
                          </div>
                        </motion.header>

                        <div className="flex flex-col items-center mb-8">
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                              className="text-[46px] font-bold tracking-tight mb-1 flex items-baseline justify-center"
                              style={{ fontFamily: 'Arial, sans-serif' }}
                            >
                              <span className="mr-0.5" style={{ fontFamily: 'Arial, sans-serif' }}>$</span>{data.bal}
                            </motion.div>
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex items-center gap-2 text-[19px] font-bold tracking-tight"
                            style={{ fontFamily: 'Arial, sans-serif' }}
                          >
                            <span className={data.delta.startsWith('-') ? "text-[#FF4D4D]" : "text-[#00FFA3]"}>
                              {data.delta.startsWith('-') ? "-$" : "+$"}{data.delta.replace('-', '')}
                            </span>
                            <Badge className={`rounded-[8px] px-1.5 py-0.5 border-none font-bold text-[15px] tracking-tight ${data.pct.startsWith('-') ? "bg-[#FF4D4D]/10 text-[#FF4D4D]" : "bg-[#00FFA3]/10 text-[#00FFA3]"}`} style={{ fontFamily: 'Arial, sans-serif' }}>
                              {data.pct.startsWith('-') ? "" : "+"}{data.pct}%
                            </Badge>
                          </motion.div>
                        </div>

                        <div className="grid grid-cols-4 gap-3 mb-8">
                          {['Receive', 'Send', 'Swap', 'Buy'].map((label, i) => (
                            <motion.div 
                              key={label}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 + (i * 0.05) }}
                              className="bg-[#2A2A2A] aspect-square rounded-[18px] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#323232] transition-colors group"
                            >
                              {i === 0 && <QrCode className="w-[22px] h-[22px] text-[#AB9FF2] group-hover:scale-110 transition-transform stroke-[2]" />}
                              {i === 1 && <Send className="w-[22px] h-[22px] text-[#AB9FF2] group-hover:scale-110 transition-transform stroke-[2]" />}
                              {i === 2 && <Repeat className="w-[22px] h-[22px] text-[#AB9FF2] group-hover:scale-110 transition-transform stroke-[2]" />}
                              {i === 3 && <DollarSign className="w-[22px] h-[22px] text-[#AB9FF2] group-hover:scale-110 transition-transform stroke-[2]" />}
                              <span className="text-[12px] font-bold text-zinc-400 tracking-normal">{label}</span>
                            </motion.div>
                          ))}
                        </div>

                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="bg-[#2A2A2A] rounded-xl p-4 mb-4 flex items-center gap-4 relative border border-white/5"
                        >
                          <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/b3054992e11f725109af4ccf86f775f9d3d505e0-40x40-1766563157101.png" className="w-11 h-11 rounded-lg" alt="terminal" />
                          <p className="text-[14px] font-bold leading-snug pr-4 tracking-normal">{data.banner}</p>
                          <X className="absolute top-2 right-2 i-3 text-zinc-500 cursor-pointer" />
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                          className="bg-[#2A2A2A] rounded-[20px] p-4 flex items-center justify-between border border-white/5 hover:bg-[#323232] transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-black overflow-hidden">
                              <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/api.phantom-1766562867239.avif" className="w-full h-full object-cover" alt="sol" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-[17px] tracking-normal">{data.tokName}</span>
                              <span className="text-[13.5px] text-zinc-500 font-medium tracking-normal" style={{ fontFamily: 'Arial, sans-serif' }}>{data.tokAmt}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-semibold text-[17px] tracking-normal" style={{ fontFamily: 'Arial, sans-serif' }}>${data.tokUsd}</span>
                            <span className={`text-[13.5px] font-medium tracking-normal ${data.tokChg.startsWith('-') ? "text-red-400" : "text-green-400"}`} style={{ fontFamily: 'Arial, sans-serif' }}>
                              {data.tokChg.startsWith('-') ? "-$" : "+$"}{data.tokChg.replace('-', '')}
                            </span>
                          </div>
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                          className="flex items-center justify-center gap-2.5 mt-6 opacity-60 hover:opacity-100 transition-opacity cursor-pointer py-2"
                        >
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500">
                             <line x1="4" y1="8" x2="20" y2="8" />
                             <line x1="4" y1="16" x2="20" y2="16" />
                             <circle cx="15" cy="8" r="2" fill="#1F1F1F" stroke="currentColor" strokeWidth="2.5" />
                             <circle cx="9" cy="16" r="2" fill="#1F1F1F" stroke="currentColor" strokeWidth="2.5" />
                           </svg>
                           <span className="text-[15px] font-bold tracking-normal text-zinc-500">{data.manage}</span>
                        </motion.div>

                        {/* Bottom Nav */}
                        <nav className="absolute bottom-0 left-0 right-0 h-16 bg-[#1F1F1F] border-t border-white/5 flex items-center justify-around px-2">
                          <div className="relative flex flex-col items-center justify-center h-full w-full">
                            <div className="absolute top-0 w-12 h-[2px] bg-[#AB9FF2] rounded-full" />
                            <div className="text-[#AB9FF2] cursor-pointer p-2">
                              <Home className="w-6 h-6 fill-current" />
                            </div>
                          </div>
                          <div className="text-zinc-500 cursor-pointer p-2 hover:text-zinc-300 w-full flex justify-center">
                            <LayoutGrid className="w-6 h-6 stroke-[1.5]" />
                          </div>
                          <div className="text-zinc-500 cursor-pointer p-2 hover:text-zinc-300 w-full flex justify-center">
                            <ArrowRightLeft className="w-6 h-6 stroke-[1.5]" />
                          </div>
                          <div className="text-zinc-500 cursor-pointer p-2 hover:text-zinc-300 w-full flex justify-center">
                            <Clock className="w-6 h-6 stroke-[1.5]" />
                          </div>
                          <div className="text-zinc-500 cursor-pointer p-2 hover:text-zinc-300 w-full flex justify-center">
                            <Search className="w-6 h-6 stroke-[1.5]" />
                          </div>
                        </nav>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Info Column */}
              <div className="max-w-md space-y-6">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-xl text-indigo-300 flex items-center gap-2">
                      <Zap className="w-5 h-5" /> Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="p-2 bg-indigo-500/10 rounded-lg shrink-0">
                        <Pencil className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Visual Mockup Editor</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">Change balances, account names, and token data instantly for UI testing.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="p-2 bg-emerald-500/10 rounded-lg shrink-0">
                        <LayoutGrid className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Multi-Screen Navigation</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">Simulates full Phantom Wallet flow from Add Wallet to Home Screen.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-indigo-300 text-xs font-medium leading-relaxed">
                  <p><strong>Note:</strong> This is a browser extension concept for designers and developers. You can use it to create high-fidelity mockups of crypto wallet interfaces without real blockchain interactions.</p>
                </div>
              </div>
            </motion.div>
          )}

          {view === "instructions" && (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="bg-zinc-900 border-zinc-800 shadow-2xl">
                <CardHeader className="pb-8">
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <Chrome className="w-8 h-8 text-indigo-400" /> Installation Guide
                  </CardTitle>
                  <CardDescription className="text-zinc-500">
                    Follow these simple steps to load the extension in your browser
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {[
                    {
                      title: "Open Extensions",
                      desc: "In Chrome, navigate to chrome://extensions or click the puzzle icon in the toolbar.",
                      icon: <Puzzle className="w-5 h-5" />
                    },
                    {
                      title: "Enable Developer Mode",
                      desc: "Locate the 'Developer mode' toggle in the top right corner and switch it ON.",
                      icon: <Settings className="w-5 h-5" />
                    },
                    {
                      title: "Load Unpacked",
                      desc: "Click 'Load unpacked' and select the extension folder from your project directory.",
                      path: "public/extension",
                      icon: <Download className="w-5 h-5" />
                    }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-black text-indigo-400 shrink-0">
                        {i + 1}
                      </div>
                      <div className="space-y-2 pt-1">
                        <h4 className="font-bold text-lg flex items-center gap-2">{step.icon} {step.title}</h4>
                        <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                        {step.path && (
                          <div className="mt-2 bg-black rounded-lg p-3 border border-white/5 font-mono text-xs text-indigo-300">
                            <code>{step.path}</code>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {view === "code" && (
            <motion.div
              key="code"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-5xl mx-auto"
            >
              <Tabs defaultValue="manifest" className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="bg-zinc-900 border border-zinc-800">
                    <TabsTrigger value="manifest">manifest.json</TabsTrigger>
                    <TabsTrigger value="html">popup.html</TabsTrigger>
                    <TabsTrigger value="js">popup.js</TabsTrigger>
                  </TabsList>
                  <Button variant="outline" className="border-zinc-800 hover:bg-zinc-800" asChild>
                    <a href="https://github.com/shibyee/orchids-testerr" target="_blank">
                      View on GitHub
                    </a>
                  </Button>
                </div>
                
                <TabsContent value="manifest">
                  <pre className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 font-mono text-sm overflow-x-auto text-indigo-300">
                    <code>{FILES.manifest}</code>
                  </pre>
                </TabsContent>
                <TabsContent value="html">
                  <pre className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 font-mono text-sm overflow-x-auto text-indigo-300">
                    <code>{FILES.popupHtml}</code>
                  </pre>
                </TabsContent>
                <TabsContent value="js">
                  <pre className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 font-mono text-sm overflow-x-auto text-indigo-300">
                    <code>{FILES.popupJs}</code>
                  </pre>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Decoration */}
      <footer className="py-12 text-center text-zinc-600 text-xs font-medium">
        Built with ❤️ for Orchid Developers
      </footer>
    </div>
  );
}
