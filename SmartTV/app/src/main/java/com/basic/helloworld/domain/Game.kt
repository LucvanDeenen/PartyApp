package com.basic.helloworld.domain

data class Game(
    val id: String = "",
    val name: String = "",
    val round: Int = 0,
    val players: List<PlayerScore> = emptyList()
)