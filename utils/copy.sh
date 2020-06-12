#!/bin/sh
cd /Users/jennygao/Desktop/learn/blog1/logs
cp access.log $(date +%Y-%m-%d-%H-%M).access.log
echo "" >access.log