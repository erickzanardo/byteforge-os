#!/bin/bash

function ps1_curr_dir() {
  pwd | sed "s|^$HOME|~|"
}

function ps1_project_type() {
  local STATUS=""

  if [ -e "Gemfile" ]
  then
    STATUS="[ ]"
  fi

  if [ -e "package.json" ]
  then
    STATUS="$STATUS[   "

    if [ -e ".nvmrc" ]
    then
      CURRENT_NODE=`node --version`
      REQUIRED_NODE=`nvm_version $(cat .nvmrc)`

      if [ "$CURRENT_NODE" !=  "$REQUIRED_NODE" ]
      then
        STATUS="$STATUS "
      fi
    fi
    STATUS="$STATUS ]"
  fi

  if [ -e "bower.json" ]
  then
    STATUS="$STATUS[ ]"
  fi

  if [ -e "gulpfile.js" ]
  then
    STATUS="$STATUS[ ]"
  fi

  if [ -e "Dockerfile" ]
  then
    STATUS="$STATUS[ ]"
  fi

  if [ -e "pom.xml" ]
  then
    STATUS="$STATUS[  ]"
  fi

  echo -e $STATUS
}

function ps1_git() {
  local STATUS=""

  local branch=`git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/'`
  if [ "$branch" != "" ]
  then
    STATUS=" $branch"

    DIFF=`git status --porcelain`
    if [ "$DIFF" != "" ]
    then
      STATUS="$STATUS*"
    fi
    STATUS=" [$STATUS] "
  fi

  echo -e $STATUS
}

export PS1=$'\u@\h \[\e[0;34m\][`ps1_curr_dir`]\[\e[0;33m\]`ps1_git`\[\e[0;32m\]`ps1_project_type`\[\e[1;32m\] \[\e[0;m\]  '
