package com.basic.helloworld.domain

data class Game(
    var id: String = "",
    val createdBy: String = "",
    val name: String = "",
    val round: Int = 0,
    val players: List<PlayerScore> = emptyList()
)