
set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Bundle 'scrooloose/nerdtree'
Plugin 'ryanoasis/vim-devicons'
Bundle 'chriskempson/base16-vim'

call vundle#end()            " required
filetype plugin indent on    " required

" Fonts and colors
set background=dark
colorscheme base16-ashes
set encoding=utf8
set guifont=Inconsolata\ for\ Powerline\ Plus\ Nerd\ File\ Types\ Plus\ Font\ Awesome\ 12
hi StatusLine ctermbg=white ctermfg=black

set expandtab
set tabstop=2
set ruler
set nu
set statusline+=%F
set laststatus=2
set autoread
set mouse=a
set autoindent
set cursorline
set pastetoggle=<F2>
noremap <up> <nop>
noremap <down> <nop>
noremap <left> <nop>
noremap <right> <nop>

let g:lightline = { 'colorscheme': 'wombat' }

filetype plugin indent on

autocmd FileType make setlocal expandtab tabstop=4 shiftwidth=4
autocmd FileType html setlocal expandtab tabstop=4 shiftwidth=4
autocmd FileType java setlocal expandtab tabstop=4 shiftwidth=4
autocmd FileType ruby setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType css setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType javascript setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType yml setlocal expandtab tabstop=2 shiftwidth=2

let g:EclimCompletionMethod = 'omnifunc'
map <C-h> <C-w>h
map <C-j> <C-w>j
map <C-k> <C-w>k
map <C-l> <C-w>l

" Resize control
map <S-h> :vertical resize -5<CR>
map <S-j> :resize -5<CR>
map <S-k> :resize +5<CR>
map <S-l> :vertical resize +5<CR>

" Autoopen nerdtree
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 0 && !exists("s:std_in") | NERDTree | endif


" Reset the listchars
set listchars=""
" a tab should display as " ", trailing whitespace as "."
set listchars=tab:\ \
" show trailing spaces as dots
set listchars+=trail:.
" The character to show in the last column when wrap is off and the line
" continues beyond the right of the screen
set listchars+=extends:>
" The character to show in the last column when wrap is off and the line
" continues beyond the right of the screen
set listchars+=precedes:<
