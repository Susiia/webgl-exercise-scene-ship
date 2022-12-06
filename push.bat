@echo off
title gitCommitAndPush
echo 准备提交...
set /p var=请输入提交消息:
git commit -a -m %var%
echo commit 提交完成!
echo 推送中...
git push gitee master
git push gitlab master
@REM git push github master
echo 推送完成!
pause