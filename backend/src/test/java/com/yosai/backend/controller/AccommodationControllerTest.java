package com.yosai.backend.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.yosai.backend.dto.LoginRequestDto;
import com.yosai.backend.service.AccommodationService;
import com.yosai.backend.service.MemberService;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.http.ResponseEntity;

class AccommodationControllerTest {

    @Test
    void loginCreatesSessionOnlyWhenCredentialsAreValid() {
        AccommodationService accommodationService = mock(AccommodationService.class);
        MemberService memberService = mock(MemberService.class);
        AccommodationController controller = new AccommodationController(accommodationService, memberService);
        LoginRequestDto request = new LoginRequestDto("member", "correct-password");
        MockHttpSession session = new MockHttpSession();
        when(memberService.login(request)).thenReturn(true);

        ResponseEntity<String> response = controller.login(request, session);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("member", session.getAttribute("userId"));
    }

    @Test
    void loginRejectsInvalidCredentialsWithoutCreatingSession() {
        AccommodationService accommodationService = mock(AccommodationService.class);
        MemberService memberService = mock(MemberService.class);
        AccommodationController controller = new AccommodationController(accommodationService, memberService);
        LoginRequestDto request = new LoginRequestDto("member", "wrong-password");
        MockHttpSession session = new MockHttpSession();
        when(memberService.login(request)).thenReturn(false);

        ResponseEntity<String> response = controller.login(request, session);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertNull(session.getAttribute("userId"));
    }
}
