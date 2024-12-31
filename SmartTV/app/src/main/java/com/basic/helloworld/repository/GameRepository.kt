package com.basic.helloworld.repository

import com.basic.helloworld.domain.Game
import com.google.firebase.firestore.ktx.toObject
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await

class GameRepository : Repository() {
    private val gamesCollection = db.collection("games")

    // Fetch all games
    suspend fun fetchGames(): List<Game> {
        return try {
            val querySnapshot = gamesCollection.get().await()
            querySnapshot.documents.map { document ->
                document.toObject<Game>()?.apply {
                    id = document.id
                } ?: throw IllegalStateException("Invalid Game object")
            }
        } catch (e: Exception) {
            e.printStackTrace()
            emptyList()
        }
    }

    // Create a new game
    suspend fun createGame(game: Game) {
        gamesCollection.document()
            .set(game).await()
    }

    // Fetch a single game by its document ID
    suspend fun fetchGameById(gameId: String): Game? {
        return try {
            val documentSnapshot = gamesCollection.document(gameId).get().await()
            documentSnapshot.toObject<Game>()?.apply {
                id = documentSnapshot.id
            }
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    // Subscribe to real-time updates for a specific game
    fun subscribeToGame(gameId: String): Flow<Game?> {
        return callbackFlow {
            val listenerRegistration = gamesCollection.document(gameId)
                .addSnapshotListener { snapshot, exception ->
                    if (exception != null) {
                        close(exception) // Close the flow if there's an error
                        return@addSnapshotListener
                    }

                    if (snapshot != null && snapshot.exists()) {
                        val game = snapshot.toObject<Game>()?.apply {
                            id = snapshot.id
                        }
                        trySend(game)
                    } else {
                        trySend(null)
                    }
                }

            println("Closing...")
            awaitClose { listenerRegistration.remove() }
        }
    }
}
