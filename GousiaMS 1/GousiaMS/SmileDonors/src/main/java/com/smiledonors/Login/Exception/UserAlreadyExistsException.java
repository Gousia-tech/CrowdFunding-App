package com.smiledonors.Login.Exception;

public class UserAlreadyExistsException extends Exception{

    public UserAlreadyExistsException() {
    }
    public UserAlreadyExistsException(String msg){

        super(msg);
    }
}
