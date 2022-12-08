@echo off
title gitCommitAndPush
git pull gitee master
git pull gitlab master
git pull github master
echo 准备提交,如果有冲突请ctrl+c结束后解决冲突...
set /p var=请输入提交消息:
git add .
git commit -a -m 刘译蓬：%var%
echo commit 提交完成!
echo 推送中...
git push gitee master
git push gitlab master
git push github master
echo 推送完成!
pause