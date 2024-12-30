package com.basic.helloworld.repository

import com.basic.helloworld.domain.Game
import com.google.firebase.firestore.ktx.toObject
import kotlinx.coroutines.tasks.await

class GameRepository : Repository() {
    private val gamesCollection = db.collection("games")

    // Fetch players from Firebase Storage
    suspend fun fetchGames(): List<Game> {
        return try {
            val querySnapshot = gamesCollection.get().await()
            querySnapshot.documents.map { it.toObject<Game>()!! }
        } catch (e: Exception) {
            e.printStackTrace()
            emptyList()
        }
    }

    // Fetch players from Firebase Storage
    suspend fun createGame(game: Game) {
        gamesCollection.document(game.id)
            .set(game).await()
    }

    // Fetch a game by its document ID
    suspend fun fetchGameById(gameId: String): Game? {
        return try {
            val documentSnapshot = gamesCollection.document(gameId).get().await()
            documentSnapshot.toObject<Game>()
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}
