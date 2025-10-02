# 🎮 CRED: The Darkware Fidelity - Setup Complete!

## ✅ Status: Fully Functional

Your crypto game is now running successfully in development mode!

### 🚀 Quick Start

```bash
# Development server (currently running)
npm run dev
# Access at: http://localhost:3000

# Production build
npm run build

# Production server
npm start
```

## 🔧 Fixes Applied

### 1. **Dependency Resolution**
- ✅ Added `immer` for Zustand state management
- ✅ Added `pino-pretty` for WalletConnect logger
- ✅ Created async-storage shim for MetaMask SDK web compatibility

### 2. **Wagmi v2 Migration**
- ✅ Updated to `useSwitchChain` hook (replaced deprecated `useSwitchNetwork`)
- ✅ Fixed RainbowKit provider configuration
- ✅ Properly typed chains array

### 3. **UI/Component Fixes**
- ✅ Replaced unavailable `Safe` icon with `PiggyBank`
- ✅ Fixed Lucide icon typing with `LucideIcon` type
- ✅ Added RainbowKit styles import

### 4. **Build Configuration**
- ✅ Fixed ESM `__dirname` in `next.config.mjs`
- ✅ Added webpack alias for async-storage shim
- ✅ Fixed typed routes compatibility

## 📁 Project Structure

```
src/
├── app/
│   ├── (app)/
│   │   ├── dashboard/     # Command center with KPIs
│   │   ├── broker/        # Exploit pack marketplace
│   │   └── rigs/          # Hack rigs management
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Landing page
│   └── providers.tsx      # Wagmi + RainbowKit setup
├── components/
│   ├── broker/            # Broker-specific components
│   ├── shell/             # Navigation & layout
│   └── system/            # Network switcher, etc.
├── state/
│   └── game-store.ts      # Zustand store with immer
├── shims/
│   └── async-storage.ts   # Web compatibility shim
└── styles/
    └── globals.css        # Tailwind + custom styles
```

## 🎯 Available Features

### Landing Page (/)
- Neon-dark cyberpunk UI
- Animated slides showcasing game features
- "Launch Interface" button to dashboard

### Dashboard (/dashboard)
- Real-time KPIs (wallet balance, unrefined, refinery queue, claimable)
- Active rigs status with efficiency meters
- Refinery job queue with ETAs
- Dark web attempt history

### Data Broker (/broker)
- Roll exploit packs with provable RNG
- Reputation system for better rolls
- Burn receipt tracking
- Recent pulls display

### Hack Rigs (/rigs)
- Rig management interface
- Deploy exploit packs
- Monitor wear and efficiency
- Submit to refinery

## ⚠️ Known Warnings (Non-blocking)

### WalletConnect 403 Error
```
[Reown Config] Failed to fetch remote project configuration. Using local/default values. Error: HTTP status code: 403
```

**Why it happens:** Using placeholder project ID `cred-darkware-dev`

**How to fix (optional):**
1. Get a free project ID from https://cloud.walletconnect.com/
2. Update `.env.local`:
   ```
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_actual_project_id
   ```

This warning doesn't affect gameplay - wallet connection will still work!

## 🎨 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + custom cyberpunk theme
- **State:** Zustand with Immer middleware
- **Animations:** Framer Motion
- **Web3:** Wagmi v2 + RainbowKit v2
- **Icons:** Lucide React
- **TypeScript:** Full type safety

## 🔥 Game Mechanics

### $CRED Economy
- Purchase exploit packs from broker
- Deploy packs to rigs for mining
- Collect unrefined $CRED
- Submit to refinery for processing
- Claim refined $CRED
- Risk on Dark Web layers with provable RNG

### Reputation System
- Spend 150 $CRED to upgrade reputation
- Higher reputation = better broker rolls
- Max level: 5

### Rig Management
- Monitor efficiency and wear
- Offline mode for wear recovery
- Queue exploit packs
- Submit unrefined to refinery

## 🌐 Browser Access

Open your browser and navigate to:
**http://localhost:3000**

### Recommended Browsers
- Chrome/Edge (best performance)
- Firefox
- Brave

## 🎮 Next Steps

1. **Test the game:**
   - Navigate through all pages
   - Try rolling exploit packs
   - Check rig status
   - View dashboard KPIs

2. **Connect wallet (optional):**
   - Get WalletConnect project ID
   - Update `.env.local`
   - Test wallet connection

3. **Customize:**
   - Adjust game parameters in `src/state/game-store.ts`
   - Modify UI colors in `tailwind.config.ts`
   - Add new routes/features

## 📝 Development Notes

- Dev server auto-reloads on file changes
- TypeScript errors show in terminal and browser
- Tailwind classes are JIT-compiled
- State persists in memory (resets on refresh)

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Kill existing process
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

### Build errors
```bash
# Clean Next.js cache
rm -rf .next
npm run build
```

### Type errors
```bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

---

**Enjoy your neon-dark syndicate strategy game!** 🌃✨

*"Trust the shadows, capture the packets."*
