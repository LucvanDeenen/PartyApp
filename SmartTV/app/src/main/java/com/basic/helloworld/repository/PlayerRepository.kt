package com.basic.helloworld.repository

import com.basic.helloworld.domain.Player
import com.google.firebase.firestore.ktx.toObject
import kotlinx.coroutines.tasks.await
import java.util.UUID

class PlayerRepository : Repository() {
    private val playersCollection = db.collection("players")

    // Fetch players from Firebase Storage
    suspend fun fetchPlayers(): List<Player> {
        return try {
            val querySnapshot = playersCollection.get().await()
            querySnapshot.documents.map { it.toObject<Player>()!! }
        } catch (e: Exception) {
            emptyList()
        }
    }

    // Save players to Firestore
    suspend fun savePlayer(player: Player) {
        playersCollection.document(player.id)
            .set(player).await()
    }
}
