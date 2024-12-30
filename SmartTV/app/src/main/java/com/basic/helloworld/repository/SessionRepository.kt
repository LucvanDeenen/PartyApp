package com.basic.helloworld.repository

import com.basic.helloworld.domain.Session

class SessionRepository : Repository() {
    private val sessionCollection = db.collection("sessions")

    // Fetch players from Firebase Storage
    suspend fun fetchSession(): Session? {
        return try {
            Session()
        } catch (e: Exception) {
            null
        }
    }
}
