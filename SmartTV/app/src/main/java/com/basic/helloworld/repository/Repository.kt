package com.basic.helloworld.repository

import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase

open class Repository {
    protected val db = Firebase.firestore
}