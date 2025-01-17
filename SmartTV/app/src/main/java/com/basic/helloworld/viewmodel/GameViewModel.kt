package com.basic.helloworld.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.basic.helloworld.domain.Game
import com.basic.helloworld.repository.GameRepository
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class GameViewModel : ViewModel() {
    private val repository = GameRepository()

    private val _games = MutableStateFlow<List<Game>>(emptyList())
    val games: StateFlow<List<Game>> get() = _games

    private val _selectedGame = MutableStateFlow<Game?>(null)
    val game: MutableStateFlow<Game?> get() = _selectedGame

    private val _isLoading = MutableStateFlow(true)
    val isLoading: StateFlow<Boolean> get() = _isLoading

    private var gameSubscriptionJob: Job? = null

    fun loadGames() {
        viewModelScope.launch {
            _isLoading.value = true
            val fetchedGames = repository.fetchGames()
            _games.value = fetchedGames
            _isLoading.value = false
        }
    }

    fun createNewGame(game: Game) {
        viewModelScope.launch {
            repository.createGame(game)
            loadGames()
        }
    }

    fun loadGameById(gameId: String) {
        viewModelScope.launch {
            _isLoading.value = true
            val game = repository.fetchGameById(gameId)
            _selectedGame.value = game
            _isLoading.value = false
        }
    }

    fun subscribeToGame(gameId: String) {
        viewModelScope.launch {
            repository.subscribeToGame(gameId).collect { updatedGame ->
                if (updatedGame != null) {
                    _selectedGame.value = updatedGame
                } else {
                    println("Game document no longer exists.")
                }
            }
        }
    }

    override fun onCleared() {
        super.onCleared()
        gameSubscriptionJob?.cancel()
    }
}
