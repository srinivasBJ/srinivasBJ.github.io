---
title: "Minimal Linux Dev Environment Setup"
date: 2024-03-10
category: "Linux"
tags: ["linux", "dotfiles", "environment"]
draft: false
---

These are quick notes for setting up a clean, minimal development environment on a fresh Ubuntu Server LTS install.

## Step 1: Base Packages
Update package lists and install standard build tools, git, and curl:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential git curl tmux neovim zsh
```

## Step 2: Zsh & Oh My Zsh
Change default shell to zsh:
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## Step 3: Git Config
Set up basic user details and configure default branch to main:
```bash
git config --global user.name "srinivasBJ"
git config --global user.email "placeholder@example.com"
git config --global init.defaultBranch main
```

These notes are lightweight and meant as quick lookup guidelines for dev machines.
