package com.basic.helloworld.domain

data class PlayerScore(
    val player: Player = Player(),
    val score: Int = 0
)
