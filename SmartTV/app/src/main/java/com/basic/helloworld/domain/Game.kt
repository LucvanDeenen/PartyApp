package com.basic.helloworld.domain

data class Game(
    val id: String = "",
    val name: String = "",
    val players: List<PlayerScore> = emptyList()
)