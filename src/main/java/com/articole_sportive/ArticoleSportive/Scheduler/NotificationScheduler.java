package com.articole_sportive.ArticoleSportive.Scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class NotificationScheduler {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public NotificationScheduler(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Scheduled(fixedRate = 5000)
    public void sendScheduledNotification() {
        messagingTemplate.convertAndSend("/topic/notifications", "Cumpară de la noi cele mai fresh produse!");
        System.out.println("Notificare automată trimisă.");
    }
}