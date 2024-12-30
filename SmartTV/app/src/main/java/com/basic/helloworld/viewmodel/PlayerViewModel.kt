package com.basic.helloworld.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.basic.helloworld.domain.Player
import com.basic.helloworld.repository.PlayerRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class PlayerViewModel : ViewModel() {
    private val repository = PlayerRepository()

    private val _players = MutableStateFlow<List<Player>>(emptyList())
    val players: StateFlow<List<Player>> get() = _players

    fun loadPlayers() {
        viewModelScope.launch {
            val fetchedPlayers = repository.fetchPlayers()
            _players.value = fetchedPlayers
        }
    }

    fun savePlayer(player: Player) {
        viewModelScope.launch {
            repository.savePlayer(player)
            loadPlayers()
        }
    }
}
