#!/bin/bash

DOCKER_COMPOSE_VERSION="v2.6.1"

#Парсим имя и версию ОС
declare $(lsb_release -d | awk '{ match($0, /(.+)\s+(.+) ([0-9]+\.[0-9]+)(.[0-9]+)?\s.+/, os);}
                        {if (os[1] != "" && os[2] != "") print "OS_NAME="os[2], "OS_VERSION="os[3]}')
echo "Checked OS: $OS_NAME $OS_VERSION"
echo "Starting Docker installation script for $OS_NAME $OS_VERSION"

if [[ $OS_NAME -eq "Ubuntu" ]]; then
    if [[ $OS_VERSION == "22.04" ]]; then
      echo "Starting installation of Docker"
      sudo apt update
      sudo apt install apt-transport-https ca-certificates curl software-properties-common
      curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
      echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
      sudo apt update
      apt-cache policy docker-ce
      sudo apt install docker-ce
      echo "Docker installed successfully"
    fi

    if [[ $OS_VERSION == "20.04" ]]; then
      sudo apt update
      sudo apt install apt-transport-https ca-certificates curl software-properties-common
      curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
      sudo add-apt-repository "deb [arch=$(dpkg --print-architecture)] https://download.docker.com/linux/ubuntu focal stable"
      sudo apt update
      apt-cache policy docker-ce
      sudo sudo apt install docker-ce
    fi

    echo "Starting installation of Docker compose"
    sudo curl -SL "https://github.com/docker/compose/releases/download/$DOCKER_COMPOSE_VERSION/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    docker-compose --version
    echo "Docker compose installed successfully"
    #Добавляем пользователя в группу docker
    sudo usermod -aG docker ${USER}
fi
echo -e "\033[41m\033[30mFor the changes to take effect, please login again"