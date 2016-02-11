
set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Bundle 'scrooloose/nerdtree'
Plugin 'ryanoasis/vim-devicons'
Bundle 'chriskempson/base16-vim'
Bundle 'kien/ctrlp.vim'
Bundle 'vim-ruby/vim-ruby'
Bundle 'tpope/vim-rails'
Bundle 'tpope/vim-fugitive'
Plugin 'ekalinin/Dockerfile.vim'
Bundle 'amadeus/vim-escaper'
Bundle 'leafgarland/typescript-vim'
Plugin 'editorconfig/editorconfig-vim'

call vundle#end()            " required
filetype plugin indent on    " required

" Fonts and colors
" set background=dark
" colorscheme base16-ashes
" hi StatusLine ctermbg=white ctermfg=black
set encoding=utf8
set guifont=Inconsolata\ for\ Powerline\ Plus\ Nerd\ File\ Types\ Plus\ Font\ Awesome\ 12

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
autocmd FileType sh setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType html setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType erb setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType typescript setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType java setlocal expandtab tabstop=4 shiftwidth=4
autocmd FileType ruby setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType css setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType javascript setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType yml setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType lua setlocal expandtab tabstop=2 shiftwidth=2

let g:EclimCompletionMethod = 'omnifunc'

" Window moving
nmap <C-h> <C-w>h
nmap <C-j> <C-w>j
nmap <C-k> <C-w>k
nmap <C-l> <C-w>l

" Resize control
nmap <left> :vertical resize -5<CR>
nmap <up> :resize -5<CR>
nmap <down> :resize +5<CR>
nmap <right> :vertical resize +5<CR>

" Copy/Paste
vmap <C-c> "+y
nmap <C-b> "+p

" Autoopen nerdtree
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 0 && !exists("s:std_in") | NERDTree | endif

" erb files bugs
au BufNewFile,BufRead *.html.erb set filetype=html
au BufNewFile,BufRead *.js.erb set filetype=javascript

" lua views files
au BufNewFile,BufRead *.etlua set filetype=html

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

" ctrlp ignores
let g:ctrlp_custom_ignore = {
  \ 'dir':  '\v[\/]\.(git|hg|svn)$',
  \ 'file': '\v\.(exe|so|dll|class|war)$'
  \ }
" Follow symbolic links
let g:ctrlp_follow_symlinks = 1 
