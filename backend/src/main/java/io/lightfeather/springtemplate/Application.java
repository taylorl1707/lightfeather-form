package io.lightfeather.springtemplate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;

import java.util.*;

class SupervisorResponse {
  public String id; 
  public String phone; 
  public String jurisdiction; 
  public String identificationNumber; 
  public String firstName; 
  public String lastName; 
}

class FormData {
  public String firstName; 
  public String lastName; 
  public String supervisor; 
  public String phoneNumber; 
  public String email; 
  public boolean phoneCheck; 
  public boolean emailCheck; 
}

class SubmitFormResponse {
  private ArrayList<String> messages;
  private boolean success;

  public SubmitFormResponse(ArrayList<String> messages, boolean success)
  {
    this.messages = messages;
    this.success = success;
  }

  public void setMessages(ArrayList<String> messages) {
    this.messages = messages;
  }

  public void setSuccess(boolean success) {
    this.success = success;
  }

  public ArrayList<String> getMessages() {
    return this.messages; 
  }

  public boolean getSuccess() {
    return this.success;
  }
}

@SpringBootApplication
@RestController
public class Application {

  private boolean checkIfString(String ch) {
    String regx = "[a-zA-Z]+"; 
    
    return ch.matches(regx);
  }

  private boolean isEmailVaild (String email) {
    String regx = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
    return email.matches(regx);
  }

  private boolean isNameValid (String name) {
    String regx = "[a-zA-Z]+"; 
    return name.matches(regx);
  }

  private boolean isPhoneValid (String phone) {
    String regx = "^(\\+?\\d{1,3}?[- .]?)?((\\(\\d{3}\\))|\\d{3})[- .]?\\d{3}[- .]?\\d{4}$";
    return phone.matches(regx);
  }

  private boolean isSupervisorValid (String supervisor) {
    String regx = "^[a-z] - [a-zA-Z]+,[a-zA-Z]+$";
    return supervisor.matches(regx);
  }

  private SubmitFormResponse validateForm(FormData form) {

    ArrayList<String> messages = new ArrayList<String>(); 
    boolean success = true; 

    if(!isNameValid(form.firstName)) {
      messages.add("firstName is not valid");
      success = false;
    } 

    if(!isNameValid(form.lastName)) {
      messages.add("lastName is not valid");
      success = false;
    } 

    if(form.emailCheck && !isEmailVaild(form.email)) {
      messages.add("Email is not valid");
      success = false;
    }
    
    if(form.phoneCheck && !isPhoneValid(form.phoneNumber)) {
      messages.add("PhoneNumber is not valid");
      success = false;
    }

    if(!isSupervisorValid(form.supervisor)) {
      messages.add("Supervisor is not valid");
      success = false;
    }

    if(success) {
      System.out.format("firstName: %s\n", form.firstName);
      System.out.format("lastName: %s\n", form.lastName);
      System.out.format("email: %s\n", form.email);
      System.out.format("phoneNumber: %s\n", form.phoneNumber);
      System.out.format("Supervisor: %s\n", form.supervisor);
      System.out.format("Need Email: %b\n", form.emailCheck);
      System.out.format("Need Phone: %b\n", form.phoneCheck);
    }

    SubmitFormResponse resp = new SubmitFormResponse(messages, success);

    return resp;
  }

  @CrossOrigin(origins = "http://localhost:3000")
  @PostMapping("/api/submit")
  public Object submit(@RequestBody FormData form) {
    return validateForm(form);
  }

  @CrossOrigin(origins = "http://localhost:3000")
  @GetMapping("/api/supervisors") 
  public String[] supervisors() {
    String uri = "https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers";

    RestTemplate apiHandler = new RestTemplate(); 

    SupervisorResponse apiResult[] = apiHandler.getForObject(uri, SupervisorResponse[].class); 

    String[] result = Arrays.stream(apiResult)
      .filter(x -> checkIfString(x.jurisdiction))
      .map(x -> String.format("%s - %s,%s", x.jurisdiction, x.lastName, x.firstName))
      .toArray(String[]::new); 

    Arrays.sort(result);

    return result;
  }

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }

}
