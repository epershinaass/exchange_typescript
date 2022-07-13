#!/bin/bash

#Проверка на запуск от root
if [[ $EUID -ne 0 ]]; then
    echo "This script must be run as root"
    exit 1
fi

#Парсим имя и версию ОС
declare $(lsb_release -d | awk '{ match($0, /(.+)\s+(.+) ([0-9]+\.[0-9]+)(.[0-9]+)?\s.+/, os);}
                        {if (os[1] != "" && os[2] != "") print "OS_NAME="os[2], "OS_VERSION="os[3]}')
echo "Checked OS: $OS_NAME $OS_VERSION"

if [[ $OS_NAME -eq "Ubuntu" ]]; then
    if [[ $OS_VERSION == "22.04" ]]; then
        apt update
        apt install apt-transport-https ca-certificates curl software-properties-common
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
        apt update
        apt-cache policy docker-ce
        apt install docker-ce

    fi

    if [[ $OS_VERSION == "20.04" ]]; then
        apt update
        apt install apt-transport-https ca-certificates curl software-properties-common
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
        add-apt-repository "deb [arch=$(dpkg --print-architecture)] https://download.docker.com/linux/ubuntu focal stable"
        apt update
        apt-cache policy docker-ce
        sudo apt install docker-ce
    fi
fi
