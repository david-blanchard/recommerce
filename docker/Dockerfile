#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------

# To fully customize the contents of this image, use the following Dockerfile instead:
# https://github.com/microsoft/vscode-dev-containers/tree/v0.128.0/containers/javascript-node-14/.devcontainer/Dockerfile
#FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-14
FROM node:latest

ENV DEBIAN_FRONTEND=noninteractive
# This Dockerfile adds a non-root user with sudo access. Use the "remoteUser"
# property in devcontainer.json to use it. On Linux, the container user's GID/UIDs
# will be updated to match your local UID/GID (when using the dockerFile property).
# See https://aka.ms/vscode-remote/containers/non-root-user for details.

# ** [Optional] Uncomment this section to install additional packages. **
#
RUN apt-get update && apt-get -y upgrade \
    && apt-get -y install --no-install-recommends apt-utils dialog 2>&1 \
    && apt-get -y install git openssh-client inetutils-tools inetutils-ping less iproute2 procps lsb-release zip unzip bc \
    curl gnupg locales zsh wget fonts-powerline sudo \
    # linuxbrew-wrapper
    # set up locale
    && locale-gen fr_FR.UTF-8 \
    #
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=dialog

# generate locale for agnoster
RUN echo "fr_FR.UTF-8 UTF-8" > /etc/locale.gen && /usr/sbin/locale-gen

ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# RUN groupadd --gid $USER_GID $USERNAME \
#     && useradd -s /bin/bash --uid $USER_UID --gid $USER_GID -m $USERNAME \
#     && apt-get update \
#     && apt-get install -y sudo \
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME
#     #
#     # Clean up
#     && apt-get autoremove -y \
#     && apt-get clean -y \
#     && rm -rf /var/lib/apt/lists/*
USER $USERNAME

ENV TERM xterm
ENV HOME /home/$USERNAME

# # Set the default shell to bash rather than sh
ENV SHELL /bin/zsh

COPY docker/zsh-in-docker.sh /tmp

RUN sh -c "$(cat /tmp/zsh-in-docker.sh)" -- \
    -t "powerlevel10k/powerlevel10k" \
    -p git \
    -p ssh-agent \    
    -p https://github.com/zsh-users/zsh-autosuggestions \
    -p https://github.com/zsh-users/zsh-completions \
    -p https://github.com/zsh-users/zsh-history-substring-search \
    -p https://github.com/zsh-users/zsh-syntax-highlighting

EXPOSE 3000 5000

COPY docker/zshrc $HOME/.zshrc

#ENTRYPOINT [ "/bin/zsh" ]
#CMD ["-l"]