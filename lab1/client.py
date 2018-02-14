#!/usr/bin/env python3


import socket
from tkinter import *
import threading
import argparse



def recver(addr, nick, lb, poison):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.sendto(bytearray([1]) + nick.encode(), addr)
    sock.settimeout(1)
    while not poison:
        try:
            data, _ = sock.recvfrom(1024)
            if data:
                lb.insert(END, data.decode())
        except socket.timeout:
            pass

    sock.sendto(bytearray([2]) + nick.encode(), addr)
    sock.close()


def sender(sock, addr, nick, en):
    sock.sendto(bytearray([0]) + "{}: {}".format(nick, en.get()).encode(), addr)
    en.delete(0, END)


def main(ip, port, nick):
    addr = (ip, port)

    root = Tk()
    lb = Listbox(root)
    en = Entry(root)

    lb.pack(side='top')
    en.pack(side='bottom')

    snd_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    en.bind("<Return>", lambda e: sender(snd_sock, addr, nick, en)) 

    poison = []
    thr = threading.Thread(target=recver, args=(addr, nick, lb, poison))

    thr.start()
    root.mainloop()

    snd_sock.close()

    poison.append(None)
    thr.join()


if __name__ == '__main__':
    argparser = argparse.ArgumentParser()
    argparser.add_argument('ip')
    argparser.add_argument('port', type=int)
    argparser.add_argument('nick')
    args = argparser.parse_args()
    main(args.ip, args.port, args.nick)
