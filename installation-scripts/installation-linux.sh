#!/bin/bash

DOCKER_COMPOSE_VERSION="v2.6.1"

################################## OS_NAME and OS_VERSION Section ######################################################
OS_NAME=$(cat /etc/os-release | egrep -i '^(NAME=)' | sed 's/"//g' | awk -F  "=" '{print $2}' | awk '{print $1}')
OS_VERSION=$(cat /etc/os-release | egrep -i '^(VERSION_ID=)' | sed 's/"//g' | awk -F  "=" '{print $2}' | awk '{print $1}')
echo "Checked OS: $OS_NAME"

echo "Starting installation of Docker"

################################## Centos Section #####################################################################

if [[ $OS_NAME -eq "CentOS" ]]; then
  if [[ $OS_VERSION == "8" ]]; then
      sudo dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo
      sudo dnf install --allowerasing docker-ce
      sudo systemctl start docker
      sudo systemctl enable docker
  fi
fi

################################## End of Centos Section ###############################################################

################################## Ubuntu Section ######################################################################

if [[ $OS_NAME -eq "Ubuntu" ]]; then
    if [[ $OS_VERSION == "22.04" ]]; then
      sudo apt update
      sudo apt install apt-transport-https ca-certificates curl software-properties-common
      curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
      echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
      https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
      sudo apt update
      apt-cache policy docker-ce
      sudo apt install docker-ce
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
fi

################################## End of Ubuntu Section ###############################################################

################################## Install Docker Compose ##############################################################

echo -e "You have installed: \033[43m\033[30m$(docker --version)\033[0m"
echo "Starting installation of Docker compose"
sudo curl -SL "https://github.com/docker/compose/releases/download/$DOCKER_COMPOSE_VERSION/docker-compose-$(uname -s)-$(uname -m)" \
-o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
echo -e "You have installed: \033[43m\033[30m$(docker-compose --version)\033[0m"
#Добавляем пользователя в группу docker
sudo usermod -aG docker ${USER}

echo -e "\033[41m\033[30mFor the changes to take effect, please login again\033[0m"

################################## End of Script #######################################################################