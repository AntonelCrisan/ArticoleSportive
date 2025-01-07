package com.articole_sportive.ArticoleSportive.Scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
public class NotificationScheduler {

    private final SimpMessagingTemplate messagingTemplate;
    private final Random random = new Random();

    @Autowired
    public NotificationScheduler(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    private List<String> getOfferTitles() {
        return Arrays.asList(
                "Cumpară de la noi cele mai fresh produse!",
                "Reduceri de sezon la articolele sportive!",
                "Echipamente premium la prețuri imbatabile!",
                "Grăbește-te! Ofertele noastre sunt limitate!",
                "Antrenează-te cu cele mai bune articole sportive!",
                "Calitate și performanță pentru sportivii adevărați!"
        );
    }

    private String getRandomOfferTitle() {
        List<String> offerTitles = getOfferTitles();
        return offerTitles.get(random.nextInt(offerTitles.size()));
    }

    @Scheduled(fixedRate = 100000)
    public void sendScheduledNotification() {
        String randomOfferTitle = getRandomOfferTitle();
        messagingTemplate.convertAndSend("/topic/notifications", randomOfferTitle);
    }
}
