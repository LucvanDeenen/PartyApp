package com.basic.helloworld.ui

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun WelcomeDialog(
    title: String = "Welcome!",
    message: String = "Get ready...",
    onDismiss: () -> Unit,
    onConfirm: () -> Unit
) {
    AlertDialog(
        onDismissRequest = { onDismiss() },
        title = {
            Text(
                text = title,
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold
            )
        },
        text = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text(
                    text = message,
                    fontSize = 16.sp
                )
            }
        },
        confirmButton = {
            Button(
                onClick = { onConfirm() },
                modifier = Modifier.padding(horizontal = 8.dp)
            ) {
                Text("Get Started")
            }
        },
        dismissButton = {
            Button(
                onClick = { onDismiss() },
                modifier = Modifier.padding(horizontal = 8.dp)
            ) {
                Text("Cancel")
            }
        }
    )
}
