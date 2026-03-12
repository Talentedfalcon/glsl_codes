#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265358979323846

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

float solid_rect(vec2 st,vec2 pos,float width,float height){
    pos-=vec2(width/2.,height/2.);
    float l=step(pos.x,st.x);
    float r=step(pos.x+width,st.x);
    float b=step(pos.y,st.y);
    float t=step(pos.y+height,st.y);
    return (l-r)*(b-t);
}

float circle(vec2 st,vec2 pos,float diameter){
    diameter/=2.;
    st-=pos;
    float pct=1.-smoothstep(diameter-0.001,diameter+0.001,sqrt(dot(st,st)));
    return pct;
}

vec2 rotate2D(vec2 st,float angle){
    st-=0.5;
    st=mat2(cos(angle),-sin(angle),
            sin(angle),cos(angle)) * st;
    st+=0.5;
    return st;
}

vec2 random_rotate(vec2 st,float index){
    if(index>0.75){
        st=rotate2D(st,-PI/2.);
    }
    else if(index>0.5){
        st=rotate2D(st,PI/2.);
    }
    else if(index>0.25){
        st=rotate2D(st,PI);
    }
    return st;
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    st.x*=u_resolution.x/u_resolution.y;
    vec3 color=vec3(0.);

    // st=rotate2D(st,PI/4.);
    st*=20.0;
    vec2 ipos=floor(st);
    vec2 fpos=fract(st);

    fpos=random_rotate(fpos,random(ipos));

    //Straight Lines
    color=vec3(solid_rect(rotate2D(fpos,PI/4.),vec2(0.5,0.5),2.,0.15));

    //Curved Lines
    // color=vec3(
    //     (circle(fpos,vec2(0.),1.1)-circle(fpos,vec2(0.),0.9))
    //     +(circle(fpos,vec2(1.),1.1)-circle(fpos,vec2(1.),0.9))
    // );

    gl_FragColor=vec4(color,1.);
}