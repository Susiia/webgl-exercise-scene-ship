@echo off
title gitCommitAndPush
git pull gitee master
git pull gitlab master
git pull github master
echo ׼���ύ,����г�ͻ��ctrl+c����������ͻ...
set /p var=�������ύ��Ϣ:
git add .
git commit -a -m �����%var%
echo commit �ύ���!
echo ������...
git push gitee master
git push gitlab master
git push github master
echo �������!
pause