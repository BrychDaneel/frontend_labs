#!/usr/bin/env python3


import socket
import argparse


def mainloop(port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    sock.bind(('', port))

    clients = []
    try:
        while True:
            data, addr = sock.recvfrom(1024)
            if data[0] == 1:
                print('Add lisner: ', addr)
                clients.append(addr)
                mess = data[1:] + ' join chat.'.encode()
                for client_addr in clients:
                    sock.sendto(mess, client_addr)
            elif data[0] == 2:
                print('Remove lisner: ', addr)
                clients.remove(addr)
                mess = data[1:] + ' leave chat.'.encode()
                for client_addr in clients:
                    sock.sendto(mess, client_addr)
            else:
                print(addr, ' : ', data)
                mess = data[1:]
                for addr in clients:
                    sock.sendto(mess, addr)
    except KeyboardInterrupt:
        sock.close()

if __name__ == '__main__':
    argparser = argparse.ArgumentParser()
    argparser.add_argument('port', type=int)
    args = argparser.parse_args()
    mainloop(args.port)
