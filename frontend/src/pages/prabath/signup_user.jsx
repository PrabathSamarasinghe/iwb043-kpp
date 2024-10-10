import React from 'react'

const signup_user = () => {
  return (
    <main>
        <div>
      <form>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="validationServer01">First name</label>
      <input type="text" class="form-control is-valid" id="validationServer01" value="Mark" required/>
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="validationServer02">Last name</label>
      <input type="text" class="form-control is-valid" id="validationServer02" value="Otto" required/>
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="validationServer03">City</label>
      <input type="text" class="form-control is-invalid" id="validationServer03" aria-describedby="validationServer03Feedback" required />
      <div id="validationServer03Feedback" class="invalid-feedback">
        Please provide a valid city.
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <label for="validationServer04">State</label>
      <select class="custom-select is-invalid" id="validationServer04" aria-describedby="validationServer04Feedback" required >
        <option selected disabled value="">Choose...</option>
        <option>...</option>
      </select>
      <div id="validationServer04Feedback" class="invalid-feedback">
        Please select a valid state.
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <label for="validationServer05">Zip</label>
      <input type="text" class="form-control is-invalid" id="validationServer05" aria-describedby="validationServer05Feedback" required />
      <div id="validationServer05Feedback" class="invalid-feedback">
        Please provide a valid zip.
      </div>
    </div>
  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input is-invalid" type="checkbox" value="" id="invalidCheck3" aria-describedby="invalidCheck3Feedback" required />
      <label class="form-check-label" for="invalidCheck3">
        Agree to terms and conditions
      </label>
      <div  id="invalidCheck3Feedback" class="invalid-feedback">
        You must agree before submitting.
      </div>
    </div>
  </div>

  <form class="was-validated">
  <div class="mb-3">
    <label for="validationTextarea">Textarea</label>
    <textarea class="form-control is-invalid" id="validationTextarea" placeholder="Required example textarea" required></textarea>
    <div class="invalid-feedback">
      Please enter a message in the textarea.
    </div>
  </div>

  <div class="custom-control custom-checkbox mb-3">
    <input type="checkbox" class="custom-control-input" id="customControlValidation1" required />
    <label class="custom-control-label" for="customControlValidation1">Check this custom checkbox</label>
    <div class="invalid-feedback">Example invalid feedback text</div>
  </div>

  <div class="custom-control custom-radio">
    <input type="radio" class="custom-control-input" id="customControlValidation2" name="radio-stacked" required />
    <label class="custom-control-label" for="customControlValidation2">Toggle this custom radio</label>
  </div>
  <div class="custom-control custom-radio mb-3">
    <input type="radio" class="custom-control-input" id="customControlValidation3" name="radio-stacked" required />
    <label class="custom-control-label" for="customControlValidation3">Or toggle this other custom radio</label>
    <div class="invalid-feedback">More example invalid feedback text</div>
  </div>

  <div class="mb-3">
    <select class="custom-select" required>
      <option value="">Choose...</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
    <div class="invalid-feedback">Example invalid custom select feedback</div>
  </div>

  <div class="custom-file mb-3">
    <input type="file" class="custom-file-input" id="validatedCustomFile" required />
    <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
    <div class="invalid-feedback">Example invalid custom file feedback</div>
  </div>

  <div class="mb-3">
    <div class="input-group is-invalid">
      <div class="input-group-prepend">
        <span class="input-group-text" id="validatedInputGroupPrepend">@</span>
      </div>
      <input type="text" class="form-control is-invalid" aria-describedby="validatedInputGroupPrepend" required />
    </div>
    <div class="invalid-feedback">
      Example invalid input group feedback
    </div>
  </div>

  <div class="mb-3">
    <div class="input-group is-invalid">
      <div class="input-group-prepend">
        <label class="input-group-text" for="validatedInputGroupSelect">Options</label>
      </div>
      <select class="custom-select" id="validatedInputGroupSelect" required>
        <option value="">Choose...</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <div class="invalid-feedback">
      Example invalid input group feedback
    </div>
  </div>

  <div class="input-group is-invalid">
    <div class="custom-file">
      <input type="file" class="custom-file-input" id="validatedInputGroupCustomFile" required />
      <label class="custom-file-label" for="validatedInputGroupCustomFile">Choose file...</label>
    </div>
    <div class="input-group-append">
       <button class="btn btn-outline-secondary" type="button">Button</button>
    </div>
  </div>
  <div class="invalid-feedback">
    Example invalid input group feedback
  </div>
</form>

  <button class="btn btn-primary" type="submit">Submit form</button>
</form>
    </div>
    </main>
  )
}

export default signup_user
