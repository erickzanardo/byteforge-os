if empty(glob('~/.vim/autoload/plug.vim'))
  silent !curl -fLo ~/.vim/autoload/plug.vim --create-dirs
    \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif

call plug#begin('~/.vim/plugged')

Plug 'scrooloose/nerdtree'
Plug 'ryanoasis/vim-devicons'
Plug 'kien/ctrlp.vim'
Plug 'vim-ruby/vim-ruby'
Plug 'tpope/vim-rails'
Plug 'tpope/vim-fugitive'
Plug 'ekalinin/Dockerfile.vim'
Plug 'leafgarland/typescript-vim'
Plug 'editorconfig/editorconfig-vim'
Plug 'freeo/vim-kalisi'
Plug 'kchmck/vim-coffee-script'
Plug 'derekwyatt/vim-scala'
Plug 'vim-airline/vim-airline'
Plug 'slim-template/vim-slim'
Plug 'nikvdp/ejs-syntax'
Plug 'jparise/vim-graphql'
Plug 'pangloss/vim-javascript'
Plug 'ap/vim-css-color'
Plug 'mxw/vim-jsx'
Plug 'flowtype/vim-flow'
Plug 'w0rp/ale'
Plug 'moll/vim-node'
Plug 'posva/vim-vue'
Plug 'dart-lang/dart-vim-plugin'
Plug 'airblade/vim-rooter'
Plug 'ervandew/supertab'
Plug 'maralla/completor.vim'

call plug#end()

" Search highlight and searching as you type
set hlsearch
set incsearch

" JSX enabled for js files
let g:jsx_ext_required = 0

" Theme
syntax enable
colorscheme kalisi
set background=dark
set t_Co=256

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
inoremap <up> <nop>
inoremap <down> <nop>
inoremap <left> <nop>
inoremap <right> <nop>

let g:lightline = { 'colorscheme': 'wombat' }

filetype plugin indent on

autocmd FileType make setlocal expandtab tabstop=4 shiftwidth=4
autocmd FileType sh setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType html setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType ejs setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType erb setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType typescript setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType java setlocal expandtab tabstop=4 shiftwidth=4
autocmd FileType ruby setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType css setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType javascript setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType json setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType coffee setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType yaml setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType lua setlocal expandtab tabstop=2 shiftwidth=2
autocmd FileType graphql setlocal expandtab tabstop=2 shiftwidth=2

" gradle as groovy
au BufNewFile,BufRead *.gradle setf groovy

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

" NERDTree
" Autoopen
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 0 && !exists("s:std_in") | NERDTree | endif

" Open shortcut
map <C-n> :NERDTreeToggle<CR>

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

" So react auto reload works ¯\_(ツ)_/¯
:set backupcopy=yes

" only enable flow if .flowconfig exists
if filereadable(".flowconfig")
  let g:flow#enable = 1
else
  let g:flow#enable = 0
endif

" ctrlp ignore
set wildignore+=node_modules

function! s:ExecuteInShell(command)
  let command = join(map(split(a:command), 'expand(v:val)'))
  let winnr = bufwinnr('^' . command . '$')
  silent! execute  winnr < 0 ? 'botright new ' . fnameescape(command) : winnr . 'wincmd w'
  setlocal buftype=nowrite bufhidden=wipe nobuflisted noswapfile nowrap number
  echo 'Running ' . command . '...'
  silent! execute 'silent %!'. command
  silent! execute 'resize ' . line('$')
  silent! redraw
  silent! execute 'au BufUnload <buffer> execute bufwinnr(' . bufnr('#') . ') . ''wincmd w'''
  silent! execute 'nnoremap <silent> <buffer> <LocalLeader>r :call <SID>ExecuteInShell(''' . command . ''')<CR>'
  echo 'Shell command ' . command . ' executed.'
endfunction
command! -complete=shellcmd -nargs=+ Shell call s:ExecuteInShell(<q-args>)
command! -complete=file -nargs=* Npm call s:ExecuteInShell('npm '.<q-args>)
command! -complete=file -nargs=* Curl call s:ExecuteInShell('curl '.<q-args>)

" Trailing whitespaces
highlight ExtraWhitespace ctermbg=red guibg=red
match ExtraWhitespace /\s\+$/

" Vertical and Horizontal
command Horizontal windo wincmd K
command Vertical windo wincmd H

" ALE config
let g:ale_linters = {
\   'javascript': ['eslint'],
\}

" YouCompleteMe
set completeopt-=preview

" Indent
hi IndentGuidesOdd  ctermbg=black
hi IndentGuidesEven ctermbg=darkgrey

" Deoplete
let g:deoplete#enable_at_startup = 1

" Using relative path for paths autocomplete
let g:deoplete#file#enable_buffer_path = 1

" Adjusting Deoplete tab order
let g:SuperTabDefaultCompletionType = "<c-n>"

" Rooter
let g:rooter_patterns = ["Rakefile", "pom.xml", "build.gradle", "package.json"]
