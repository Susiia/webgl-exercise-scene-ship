@echo off
title gitCommitAndPush
echo ׼���ύ...
set /p var=�������ύ��Ϣ:
git commit -a -m %var%
echo commit �ύ���!
echo ������...
git push gitee master
git push gitlab master
@REM git push github master
echo �������!
pause